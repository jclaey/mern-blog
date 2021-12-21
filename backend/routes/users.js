const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { isAuthorized } = require('../middleware');
const {
  postRegister,
  postLogin,
  getProfile,
  updateProfile
} = require('../controllers/users');

router.post('/register', asyncHandler(postRegister));

router.post('/login', asyncHandler(postLogin));

router.get('/:id/profile', getProfile);

router.put('/:id/profile/edit', isAuthorized, asyncHandler(updateProfile));

module.exports = router;