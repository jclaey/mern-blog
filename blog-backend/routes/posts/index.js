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
    postsGet, 
    postNew,
    postGet,
    postUpdate,
    postDelete
} from '../../controllers/posts/index.js'

import { 
    validatePostTitle,
    validatePostContent
} from '../validators.js'

router.route('/').get(asyncHandler(postsGet))
router.route('/new').post(upload.single('image'), [
    validatePostTitle,
    validatePostContent
], handleValidationErrors, asyncHandler(postNew))
router.route('/post/:id').get(asyncHandler(postGet))
router.route('/post/:id/update').patch(upload.single('image'), [
    validatePostTitle,
    validatePostContent
], asyncHandler(postUpdate))
router.route('/post/:id/delete').delete(asyncHandler(postDelete))

export default router