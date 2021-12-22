const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { isAuthorized } = require('../middleware');
const {
  getPosts,
  postShow,
  postNew,
  commentCreate,
  postUpdate
} = require('../controllers/posts');

router.get('/', asyncHandler(getPosts));

router.get('/:id', asyncHandler(postShow));

router.post('/:id/comments', isAuthorized, asyncHandler(commentCreate));

router.put('/:id/edit', isAuthorized, asyncHandler(postUpdate));

router.post('/new', asyncHandler(postNew));

module.exports = router;