const Post = require('../../models/Post');

module.exports = {
    Query: {
        async getposts() {
            try {
                const posts = await Post.find();
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
    }
}