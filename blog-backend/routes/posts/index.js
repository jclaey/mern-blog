import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'

import {
    getPosts, 
    postNew
} from '../../controllers/posts/index.js'

router.route('/').get(asyncHandler(getPosts))
router.route('/new').post(asyncHandler(postNew))

export default router