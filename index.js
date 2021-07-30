const { ApolloServer } = require('apollo-server');
const mogoose = require('mongoose');

const {MONGODB} = require('./config.js');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');


const server = new ApolloServer({
  typeDefs,
  resolvers
})


// db
mogoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("DB Connected");
  return server.listen({ port: 5000 })
}).then((res) => console.log(`Server Running On ${res.url}`));
