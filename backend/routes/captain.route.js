const express = require('express');
const { registerCaptain, getCaptain, getCaptainProfile, logoutCaptain, updateCaptainStatus } = require('../controllers/captain.controller');
const {captainAuthMiddleware} = require('../middleware/auth.middleware');
const captainRouter = express.Router();
const { body } = require('express-validator');


captainRouter.post('/register', [
    body('fullname').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('status').isIn(['active', 'inactive']).withMessage('Invalid status value'),
    body('vehicle.color').isLength({ min: 2 }).withMessage('Color must be at least 2 characters long'),
    body('vehicle.plate').isLength({ min: 2 }).withMessage('Plate must be at least 2 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto']).withMessage('Invalid vehicle type'),
], registerCaptain);

captainRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], getCaptain);

captainRouter.get('/profile',captainAuthMiddleware, getCaptainProfile);

captainRouter.get('/logout',captainAuthMiddleware, logoutCaptain);

captainRouter.patch('/status', captainAuthMiddleware, updateCaptainStatus);

module.exports = captainRouter;

