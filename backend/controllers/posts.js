

module.exports = {
  postIndex(req, res, next) {
    res.send('POST INDEX');
  },
  postShow(req, res, next) {
    res.send('POST SHOW');
  }
};