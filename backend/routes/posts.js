const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  getPosts,
  postShow,
  postNew
} = require('../controllers/posts');

router.get('/', asyncHandler(getPosts));

router.get('/:id', asyncHandler(postShow));

router.post('/new', asyncHandler(postNew));

module.exports = router;