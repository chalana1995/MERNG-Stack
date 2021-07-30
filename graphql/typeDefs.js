const { gql } = require('apollo-server');


module.exports = gql`
type Post {
  id: String!
  body: String!
  createdAt: String!
  userName: String!
}
type User {
  id:ID!
  email: String!
  token:String!
  userName: String!
  createdAt: String!
  
}

input RegisterInput {
  userName: String!
  password: String!
  confirmPassword: String!
  email: String
}
  type Query{
     getposts: [Post]
  }

type Mutation{
  register(registerInput: RegisterInput): User!
}
`