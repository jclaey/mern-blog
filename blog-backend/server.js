import 'dotenv/config'
dotenv.config()
import express from 'express'
import connectDB from './config/db'
const PORT = process.env.PORT || 3000

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})