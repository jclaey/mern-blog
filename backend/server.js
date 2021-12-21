const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));