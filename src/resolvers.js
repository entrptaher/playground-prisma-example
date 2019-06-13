const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

// Subscription Constants
const USER_ADDED_TOPIC = "user_added";
const USER_UPDATED_TOPIC = "user_updated";

const resolvers = {
  Query: {
    users: (root, args, ctx, info) => ctx.prisma.query.users({}, info)
  },
  Mutation: {
    createUser: async (root, args, ctx, info) => {
      const user = await ctx.prisma.mutation.createUser(
        { data: { name: args.name } },
        info
      );

      // notify subscriptions about the change
      // this can be automated with ctx.prisma.$subscription
      // but we don't need that right now
      pubsub.publish(USER_ADDED_TOPIC, { userAdded: user });

      return user;
    },
    updateUser: async (root, args, ctx, info) => {
      const user = await ctx.prisma.mutation.updateUser(
        { where: { id: args.id }, data: { name: args.name } },
        info
      );

      // notify subscriptions about the change
      pubsub.publish(USER_UPDATED_TOPIC, { userUpdated: user });

      return user;
    }
  },
  Subscription: {
    user: {
      // Example of using prisma-binding
      subscribe: async (parent, args, context, info) => {
        return context.prisma.subscription.user(
          {
            mutation_in: ["CREATED", "UPDATED"]
          },
          info
        );
      }
    },
    userAdded: {
      // example of using pub-sub from graphql-subscriptions
      subscribe: (root, args, ctx, info) => {
        return pubsub.asyncIterator(USER_ADDED_TOPIC);
      }
    },
    userUpdated: {
      subscribe: (root, args, ctx, info) => {
        return pubsub.asyncIterator(USER_UPDATED_TOPIC);
      }
    }
  }
};

module.exports = resolvers;
