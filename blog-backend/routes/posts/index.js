import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'

import {
    getPosts, 
    postNew
} from '../../controllers/posts/index.js'

router.route('/').get(getPosts)
router.route('/new').post(postNew)

export default router