const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
require("dotenv").config();
const mogoose = require('mongoose');

const Post = require('./models/Post');


const typeDefs = gql`
type Post {
  id: String!
  body: String!
  createdAt: String!
  userName: String!
}
  type Query{
     getposts: [Post]
  }
`

const resolvers = {
  Query: {
    async getposts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})


// db
mogoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("DB Connected");
  return server.listen({ port: 5000 })
}).then((res) => console.log(`Server Running On ${res.url}`));
