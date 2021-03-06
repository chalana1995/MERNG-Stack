const { gql } = require('apollo-server');


module.exports = gql`
type Post {
  id: String!
  body: String!
  createdAt: String!
  userName: String!
  comments: [Comment]!
  likes: [Like]!
  likeCount: Int!
  commentCount: Int!
}

type Comment {
  id: ID!
  body: String!
  userName: String!
  createdAt: String!
}

type Like {
  id: ID!
  userName: String!
  createdAt: String!
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
     getpost(postId: ID!): Post
  }

type Mutation{
  register(registerInput: RegisterInput): User!
  login(userName: String!, password: String!) : User!
  createPost(body:String!): Post!
  deletePost(postId: ID!): String!
  createComment(postId: String!, body: String!): Post!
  deleteComment(postId: ID!, commentId: ID!): Post!
  likePost(postId: ID!): Post!
}
`