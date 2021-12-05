const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const createError = require('http-errors');

dotenv.config();

connectDB();

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'snoop bloggy blog',
  resave: false,
  saveUninitialized: true
}));

// set local variables middleware
app.use((req, res, next) => {
  // req.user = {
  //   '_id': '6175a185a3986ad8b61ab3a8',
  //   'username': 'jason'
  // }
  res.locals.currentUser = req.user;
  res.locals.title = 'Surf Shop';
  res.locals.success = req.session.success || '';
  delete req.session.success;
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
});

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));