import { body } from "express-validator"

export const validatePostTitle = 
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .escape()

export const validatePostContent = 
    body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .escape()

export const validateEmail =
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')

export const validatePassword = 
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 12, max: 30 })
    .withMessage('Password must be between 12 and 30 characters')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,30}$/)
    // .withMessage('Password must include uppercase, lowercase, number, and special character')