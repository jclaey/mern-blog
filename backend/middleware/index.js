const User = require('../models/User');
const jwt = require('jsonwebtoken');

const middleware = {
  notFound: (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(err);
  },
  errorHandler: (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  },
  isAuthorized: async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized');
      }
    }
  }
};

module.exports = middleware;