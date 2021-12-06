const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
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
        token: null
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
};