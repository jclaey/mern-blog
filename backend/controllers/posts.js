const Post = require('../models/Post');
const User = require('../models/User');
const { cloudinary } = require('../cloudinary');

module.exports = {
  async getPosts(req, res, next) {
    const posts = await Post.find({}).populate({
      path: 'author',
      model: 'User'
    }).sort({ '_id': -1 });
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
    const file = req.file;

    const post = await Post.create({
      title,
      content,
      image: {
        path: file.path,
        filename: file.filename
      },
      author
    });

    if (post) {
      res.status(201).json({
        _id: post._id,
        title: post.title,
        content: post.content,
        image: post.image,
        author: post.author
      });
    } else {
      res.status(500);
      throw new Error('Server error');
    }
  },
  async commentCreate(req, res, next) {
    const { body } = req.body;

    const post = await Post.findById(req.params.id).populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User'
      }
    }).exec();

    if (post) {
      const currentUserComment = post.comments.filter(comment => comment.author.equals(req.user._id));

      if (currentUserComment.length) {
        res.status(400);
        throw new Error('You have already commented on this post');
      } 

      const user = await User.findById(req.user._id);

      post.comments.push({
        name: user.name,
        body,
        author: req.user._id
      });

      post.save();

      res.status(201).json({ message: 'Comment created' });
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  },
  async postUpdate(req, res, next) {
    const { title, content } = req.body;
    const file = req.file;

    const post = await Post.findById(req.params.id);

    if (post) {
      post.title = title || post.title;
      post.content = content || post.content;

      if (file) {
        await cloudinary.uploader.destroy(post.image.filename);

        post.image.path = file.path;
        post.image.filename = file.filename;
      }

      await post.save();

      res.status(201).json({ message: 'Post updated' });
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  },
  async commentUpdate(req, res, next) {
    const { body } = req.body;

    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(comment => String(comment.author) === String(req.user._id));

    if (comment) {
      comment.body = body || comment.body;

      post.save();

      res.status(201).json({
        name: comment.name,
        body: comment.body,
        author: comment.author,
        date: comment.date
      });
    } else {
      res.status(404);
      throw new Error('Comment not found');
    }
  },
  async postDelete(req, res, next) {
    const post = await Post.findById(req.params.id);

    if (post) {
      await cloudinary.uploader.destroy(post.image.filename);
      await post.remove();

      res.status(201).json({ message: 'Post deleted' });
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  },
  async commentDelete(req, res, next) {
    await Post.findByIdAndUpdate(req.params.id, {
      "$pull": { "comments": { "_id": req.params.comment_id } }
    });

    res.status(201).json({ message: 'Comment deleted' });
  }
};