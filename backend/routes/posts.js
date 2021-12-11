const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
  getPosts,
  showPost
} = require('../controllers/posts');

router.get('/', asyncErrorHandler(getPosts));

router.get('/:id', asyncErrorHandler(showPost));

module.exports = router;