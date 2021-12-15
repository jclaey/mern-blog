const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  getPosts,
  showPost
} = require('../controllers/posts');

router.get('/', asyncHandler(getPosts));

router.get('/:id', asyncHandler(showPost));

module.exports = router;