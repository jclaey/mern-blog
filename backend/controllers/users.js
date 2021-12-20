const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
const createToken = require('../utils/createToken');

module.exports = {
  async postRegister(req, res, next) {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: createToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  },
  async postLogin(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const matchPassword = async (inputPassword) => {
      return await bcrypt.compare(inputPassword, user.password);
    };

    if (user && (await matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: createToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  },
  async getProfile(req, res, next) {
    const user = await User.findById(req.params.id);
    const posts = await Post.find().where('author').equals(req.params.id).limit(5).exec();

    // Somehow we need to compare the current user's user id with the profile owner's user id. We will conditionally show 'edit' and 'delete' buttons depending upon whether the two ids match. Additionally, we will protect the 'edit' and 'delete' routes with our isAuthorized middleware

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        posts
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  },
  async updateProfile(req, res, next) {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        // pre-save middleware in user model will automatically salt and hash password before save
        user.password = req.body.password;
      }
  
      const updateUser = await user.save();
  
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        token: createToken(updateUser._id)
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
};