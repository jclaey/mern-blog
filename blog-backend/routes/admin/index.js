import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { authAdmin } from '../../middleware/auth.js'

import {
    validateEmail,
    validatePassword
} from '../validators.js'

import {
    login
} from '../../controllers/admin/index.js'

router.route('/login').post(authAdmin, [
    validateEmail,
    validatePassword
], asyncHandler(login))

export default router