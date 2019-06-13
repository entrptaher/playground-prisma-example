const resolvers = {
  Query: {
    products: (root, args, ctx, info) => ctx.prisma.query.products(args, info)
  },
  // Mutation:{
  //   createProduct: (root, args, ctx, info) => ctx.prisma.mutation.createProduct(args, info)
  // }
};

module.exports = resolvers;
