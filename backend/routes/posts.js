const express = require('express');
const router = express.Router();
const {
  postIndex,
  postNew,
  postShow,
  postCreate,
  postEdit,
  postUpdate,
  postDestroy
} = require('../controllers/posts');

router.get('/', postIndex);

router.get('/new', postNew);

router.post('/', postCreate);

router.get('/:id', postShow);

router.get('/:id/edit', postEdit);

router.put('/:id', postUpdate);

router.delete('/:id', postDestroy);

module.exports = router;