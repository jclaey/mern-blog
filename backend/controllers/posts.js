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
  async postShow(req, res, next) {
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
  },
  async postNew (req, res, next) {
    const { title, content, author } = req.body;

    const post = await Post.create({
      title,
      content,
      author
    });

    if (post) {
      res.status(201).json({
        _id: post._id,
        title: post.title,
        content: post.content,
        author: post.author
      });
    } else {
      res.status(500);
      throw new Error('Server error');
    }
  }
};