const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
  getPosts
} = require('../controllers/posts');

router.get('/', asyncErrorHandler(getPosts));

module.exports = router;