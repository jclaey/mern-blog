module.exports = {
  postIndex(req, res, next) {
    res.send('POST INDEX');
  },
  postNew(req, res, next) {
    res.send('POST NEW');
  },
  postCreate(req, res, next) {
    res.send('POST CREATE');
  },
  postShow(req, res, next) {
    res.send('POST SHOW');
  },
  postEdit(req, res, next) {
    res.send('POST EDIT');
  },
  postUpdate(req, res, next) {
    res.send('POST UPDATE');
  },
  postDestroy(req, res, next) {
    res.send('POST DESTROY');
  }
}