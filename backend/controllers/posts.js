const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  async getPosts(req, res, next) {
    const posts = await Post.find({}).populate({
      path: 'author',
      model: 'User'
    });
    res.json(posts);
  },
  async showPost(req, res, next) {
    const post = await Post.findById(req.params.id).populate({
      path: 'author',
      model: 'User'
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  }
};