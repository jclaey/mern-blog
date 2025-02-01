import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'
import multer from 'multer'
import cookieParser from 'cookie-parser'  // ✅ Ensure cookie-parser is used
import adminRouter from './routes/admin/index.js'
import postsRouter from './routes/posts/index.js'
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,  // ✅ Ensures cookies are sent with requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ Ensures Express can read cookies

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/posts', postsRouter);
app.use('/api/admin', adminRouter);

app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
});

app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);

    if (err instanceof multer.MulterError) {
        res.status(400).json({ message: err.message });
    } else if (err.message === 'Invalid file type. Only image files are allowed.') {
        res.status(400).json({ message: err.message });
    } else {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode);
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Closing server...');
    server.close(() => {
        console.log('Server closed.');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});