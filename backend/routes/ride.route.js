const express = require('express');
const { authMiddleware, captainAuthMiddleware } = require('../middleware/auth.middleware');
const rideController = require('../controllers/ride.controller');
const { body, query } = require('express-validator');

const rideRouter = express.Router();

rideRouter.post(
  '/request',
  authMiddleware,
  [
    body('pickup').trim().notEmpty().withMessage('Pickup location is required'),
    body('destination').trim().notEmpty().withMessage('Destination location is required'),
    body('vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
  ],
  rideController.requestRide
);

rideRouter.get('/fare-distance-duration', authMiddleware, rideController.calculateFare);
rideRouter.get('/otp-verify',
   query('otp').trim().notEmpty().withMessage('OTP is required'),
   query('rideId').trim().notEmpty().withMessage('Ride ID is required'),
   captainAuthMiddleware, rideController.otpVerify);
rideRouter.post('/accept', captainAuthMiddleware, rideController.acceptRide);
rideRouter.post('/end-ride',
   body('rideId').trim().notEmpty().withMessage('Ride ID is required'),
   captainAuthMiddleware, rideController.endRide);

module.exports = rideRouter;