import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));