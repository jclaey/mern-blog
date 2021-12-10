const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
  postLogin
} = require('../controllers/users');

router.post('/login', postLogin);

module.exports = router;