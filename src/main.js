const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./squema");
const data = require("./data");

/**
 * Entry point of the application
 */
function main() {
  const server = new ApolloServer({ typeDefs, resolvers, context: { data } });

  server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`);
  });
}

main();
