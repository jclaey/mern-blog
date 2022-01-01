const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const asyncHandler = require('express-async-handler');
const { isAuthorized } = require('../middleware');
const {
  getPosts,
  postShow,
  postNew,
  commentCreate,
  postUpdate,
  commentUpdate,
  postDelete,
  commentDelete
} = require('../controllers/posts');

router.get('/', asyncHandler(getPosts));

router.post('/new', upload.single('image'), asyncHandler(postNew));

router.get('/:id', asyncHandler(postShow));

router.put('/:id/edit', isAuthorized, upload.single('image'), asyncHandler(postUpdate));

router.delete('/:id/delete', isAuthorized, asyncHandler(postDelete));

router.post('/:id/comments', isAuthorized, asyncHandler(commentCreate));

router.put('/:id/comments/:comment_id/edit', isAuthorized, asyncHandler(commentUpdate));

router.delete('/:id/comments/:comment_id/delete', isAuthorized, asyncHandler(commentDelete));

module.exports = router;