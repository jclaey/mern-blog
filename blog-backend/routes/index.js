import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/async.js'

import crypto from 'node:crypto'

const token = crypto.randomBytes(64).toString('hex')

console.log(token)

export default router