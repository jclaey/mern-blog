const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));