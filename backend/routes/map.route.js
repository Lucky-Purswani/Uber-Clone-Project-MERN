const express = require('express');
const mapRouter = express.Router();
const mapController = require('../controllers/map.controller')
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/auth.middleware');

mapRouter.get('/coordinates', optionalAuthMiddleware, mapController.getCoordinates);
mapRouter.get('/distance-time', authMiddleware, mapController.getDistanceTime);
mapRouter.get('/suggestions', authMiddleware, mapController.getSuggestions);

module.exports = mapRouter;