const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isAuthorized } = require('../middleware');
const {
  postRegister,
  postLogin,
  getProfile
} = require('../controllers/users');

router.post('/register', asyncErrorHandler(postRegister));

router.post('/login', asyncErrorHandler(postLogin));

router.get('/:id/profile', getProfile);

module.exports = router;