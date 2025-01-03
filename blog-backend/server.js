import 'dotenv/config'
dotenv.config()
import express from 'express'
import connectDB from './config/db'
import adminRouter from './routes/admin/index.js'
import postsRouter from './routes/posts/index.js'
const PORT = process.env.PORT || 3000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/posts', postsRouter)
app.use('/api/admin', adminRouter)

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if status isn't set
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack in production
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})