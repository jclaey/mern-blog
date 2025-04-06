import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { authAdmin } from '../../middleware/auth.js'
import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12 hours
  max: 5, // limit to 5 requests per windowMs
  message: {
    message: "Too many login attempts from this IP. Please wait 12 hours and try again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
})

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

router.route('/secure-access-portal').post(
    loginLimiter, 
[
    validateEmail,
    validatePassword
], asyncHandler(login))
router.route('/logout').post(logout)
router.route('/refresh').post(refreshAccessToken)
router.route('/dashboard-admin').get(authAdmin, asyncHandler(getDashboardAdmin))

export default router