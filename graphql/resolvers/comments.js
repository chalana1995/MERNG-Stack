const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const { UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        async createComment(_, { postId, body }, context) {
            const user = checkAuth(context);

            if(body.trim() === '') {
                  throw new UserInputError('Empty comment', {
                      errors: {
                          body: 'Comment body must not empty'
                      }
                  })
            }
           
            const post = await Post.findById(postId);

            if(post)
            {
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
        }
    }
}