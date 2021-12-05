module.exports = {
  getHome(req, res, next) {
    res.send('HOME PAGE');
  },
  getRegister(req, res, next) {
    res.send('GET REGISTER');
  },
  postRegister(req, res, next) {
    res.send('POST REGISTER');
  },
  getLogin(req, res, next) {
    res.send('GET LOGIN');
  },
  postLogin(req, res, next) {
    res.send('POST LOGIN');
  },
  getLogout(req, res, next) {
    res.send('GET LOGOUT');
  },
  getProfile(req, res, next) {
    res.send('GET PROFILE');
  },
  updateProfile(req, res, next) {
    res.send('PUT PROFILE');
  }
}