import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { authAdmin } from '../../middleware/auth.js'

import {
    validateEmail,
    validatePassword
} from '../validators.js'

import {
    login,
    refreshAccessToken,
    logout,
    getDashboardAdmin
} from '../../controllers/admin/index.js'

router.route('/login').post([
    validateEmail,
    validatePassword
], asyncHandler(login))
router.route('/refresh').post(refreshAccessToken)
router.route('/logout').post(logout)
router.route('/dashboard-admin').get(authAdmin, asyncHandler(getDashboardAdmin))

export default router