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