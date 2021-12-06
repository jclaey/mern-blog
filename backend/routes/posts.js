const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
  postIndex,
  postShow
} = require('../controllers/posts');

router.get('/', postIndex);

router.get('/:id', postShow);

module.exports = router;