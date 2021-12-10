const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  async getPosts(req, res, next) {
    const posts = await Post.find({}).populate({
      path: 'author',
      model: 'User'
    });
    res.json(posts);
  }
};