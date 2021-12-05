const express = require('express');
const router = express.Router();
const {
  getHome,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout,
  getProfile,
  updateProfile
} = require('../controllers/index');

router.get('/', getHome);

router.get('/register', getRegister);

router.post('/register', postRegister);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/logout', getLogout);

router.get('/profile', getProfile);

router.put('/profile', updateProfile);


module.exports = router;