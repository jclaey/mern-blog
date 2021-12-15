const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { isAuthorized } = require('../middleware');
const {
  postRegister,
  postLogin,
  getProfile
} = require('../controllers/users');

router.post('/register', asyncHandler(postRegister));

router.post('/login', asyncHandler(postLogin));

router.get('/:id/profile', getProfile);

module.exports = router;