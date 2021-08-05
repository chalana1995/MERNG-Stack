const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError, UserInputError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');

module.exports = {
    Query: {
        async getposts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getpost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post
                }
                else {
                    throw new Error('Post Not Found');
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            if (body.trim() === "") {
                throw new Error('Post Body must not be Empty');
            }

            const newpost = new Post({
                body,
                user: user.id,
                userName: user.userName,
                createdAt: new Date().toISOString()
            })

            const post = newpost.save();

            return post;
        },
        async deletePost(_, { postId }, context) {
            const { userName } = checkAuth(context);

            try {
                const post = await Post.findById(postId);

                if (userName === post.userName) {
                    await post.delete();
                    return 'Post deleted Successfully'
                }
                else {
                    throw new AuthenticationError('Action not Allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async likePost(_, { postId }, context) {
            const { userName } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                if (post.likes.find(like => like.userName === userName)) {
                    post.likes = post.likes.filter(like => like.userName !== userName);
                }
                else {
                    post.likes.push({
                        userName,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save();
                return post;
            }
            else {
                throw new UserInputError('Post Not Found');
            }
        }
    }
}