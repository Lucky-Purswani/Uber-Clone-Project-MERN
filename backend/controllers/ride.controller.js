const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');
const { sendMessageToSocketID } = require('../socket');
const rideModel = require('../models/ride.model');

exports.requestRide = async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("req.body", req.body);
    //Vehicle type req.
    const { pickup, destination, vehicleType, captain } = req.body;
    // const { pickup, destination } = req.body;
    const user = req.user._id;
    try {
        const newRide = await rideService.createRide({user, pickup, destination, vehicleType});
        res.status(201).json(newRide);
        //Vehicle type req.
        // const newRide = await rideService.createRide({user, pickup, destination, vehicleType});
        // console.log(newRide);
        const pickupCoordinates = await mapService.getCoordinatesFromAddress(pickup);
        const {ltd , lng} = pickupCoordinates;
        const captains = await mapService.getCaptainsInRadius(ltd, lng, 10, vehicleType);
        // if (!captains || captains.length === 0) {
        //     res.status(404).json({ error: "No captains found nearby" });
        // }
        newRide.otp = "";
        const rideWithUserDetail = await rideModel.findOne({ _id: newRide._id }).populate('user');
        captains.map(captain => {
            console.log("captain for status check", captain);
            if(captain.status === 'active'){
                sendMessageToSocketID(captain.socketId, {event: 'ride-request', message: rideWithUserDetail});
            }
            // console.log("There is ride with all details",rideWithUserDetail);
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.calculateFare = async (req, res) => {
    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.fareCalculator(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.acceptRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("req.body for captain",req.body);
    const { rideId, captain } = req.body;
    try {
        const acceptedRide = await rideService.acceptRideService(rideId, captain);
        sendMessageToSocketID(acceptedRide.user.socketId, {event: 'ride-accepted', message: acceptedRide});
        res.status(200).json(acceptedRide);
    } catch (error) {
        res.status(500).json({ erroring1: error.message });
    }
}


exports.otpVerify = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { otp, rideId } = req.query;
    try {
        const acceptedRide = await rideService.otpVerifyService({otp, rideId, captain: req.captain});
        sendMessageToSocketID(acceptedRide.user.socketId, {event: 'otp-verified', message: acceptedRide});
        res.status(200).json(acceptedRide);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const acceptedRide = await rideService.endRideService(rideId, req.captain);
        sendMessageToSocketID(acceptedRide.user.socketId, {event: 'ride-ended', message: acceptedRide});
        res.status(200).json(acceptedRide);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}