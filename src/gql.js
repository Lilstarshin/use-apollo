// @ts-check
const { ApolloServer, gql } = require('apollo-server');
const { userInfo } = require('os');
const { sequelize, User, City } = require('./sequelize');

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    age: Int!
    city: City
  }
  type City {
    id: Int!
    name: String!
    users: [User]
  }
  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => User.findAll(),
  },

  User: {
    city: async (user) =>
      City.findOne({
        where: {
          id: user.cityId,
        },
      }),
  },
  City: {
    users: async (city) =>
      User.findAll({
        where: {
          cityId: city.id,
        },
      }),
  },
};

async function main() {
  await sequelize.sync({ force: true });
  const Seoul = await City.build({
    name: 'Seoul',
  }).save();

  await User.build({
    age: 26,
    name: 'Coco',
    cityId: Seoul.getDataValue('id'),
  }).save();
  await User.build({
    age: 30,
    name: 'Eoeo',
    cityId: Seoul.getDataValue('id'),
  }).save();

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
