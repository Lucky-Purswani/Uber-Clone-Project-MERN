const express = require('express');
const { registerUser, getUser, getUserProfile, logoutUser } = require('../controllers/user.controller');
const {authMiddleware} = require('../middleware/auth.middleware');
const userRouter = express.Router();
const { body } = require('express-validator');

userRouter.post('/register', [
    body('fullname').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], registerUser);

userRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], getUser);

userRouter.get('/profile', authMiddleware, getUserProfile);

userRouter.get('/logout', authMiddleware, logoutUser);

module.exports = userRouter;
