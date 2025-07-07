const mapService = require('../services/map.service');

exports.getCoordinates = async (req, res) => {
    const { address } = req.query;
    try {
        const coordinates = await mapService.getCoordinatesFromAddress(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getDistanceTime = async (req, res) => {
    const { origin, destination } = req.query;
    try {
        const distanceAndTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceAndTime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getSuggestions = async (req, res) => {
    const { address } = req.query;
    try {
        const suggestions = await mapService.getSuggestions(address);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}