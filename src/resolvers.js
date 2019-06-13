const { Prisma } = require("prisma-binding");
const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_API,
  debug: true
});

const resolvers = {
  Query: {
    // products: (root, args, ctx, info) => ctx.prisma.query.products(args, info)
  },
  Mutation: {
    // createProduct: (root, args, ctx, info) => ctx.prisma.mutation.createProduct(args, info)
  }
};

for (let name of Object.keys(prisma.query)) {
  resolvers.Query[name] = (root, args, ctx, info) =>
    ctx.prisma.query[name](args, info);
}

for (let name of Object.keys(prisma.mutation)) {
  resolvers.Mutation[name] = (root, args, ctx, info) =>
    ctx.prisma.mutation[name](args, info);
}

module.exports = resolvers;
