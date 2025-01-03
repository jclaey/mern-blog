import express from 'express'
const router = express.Router()
import multer from 'multer'
import { storage } from '../../cloudinary/index.js'
import asyncHandler from '../../middleware/async.js'
import { imageFileFilter } from '../../utils/fileFilter.js'
import { handleValidationErrors } from '../../middleware/validationErrors.js'
const upload = multer({ 
    storage,
    imageFileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
})

import {
    getPosts, 
    postNew
} from '../../controllers/posts/index.js'

import { 
    validatePostTitle,
    validatePostContent
} from '../validators.js'

router.route('/').get(asyncHandler(getPosts))
router.route('/new').post(upload.single('image'), [
    validatePostTitle,
    validatePostContent
], handleValidationErrors, asyncHandler(postNew))

export default router