const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation: {
        async createComment(_, { postId, body }, context) {
            const { userName } = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                })
            }

            const post = await Post.findById(postId);
            console.log("===post===", post);
            if (post) {
                post.comments.unshift({
                    body,
                    userName,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post
            }
            else {
                throw new UserInputError('Post not Found');
            }
        },
        async deleteComment(_, { postId, commentId }, context) {
            const {userName} = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId)

                if (post.comments[commentIndex].userName === userName) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }
                else {
                    throw new AuthenticationError('Action Not Allowed');
                }
            }
            else {
                throw new UserInputError('Post Not Found');
            }

        }
    }
}
