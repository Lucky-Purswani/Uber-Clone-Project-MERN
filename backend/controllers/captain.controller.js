const {validationResult} = require('express-validator');
const captainModel = require('../models/captain.model');
const {createCaptain} = require('../services/user.service');
const BlackListing = require('../models/blackListing.model');


exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { fullname , email, password, status, vehicle } = req.body;
    const firstname = fullname.firstname;
    const lastname = fullname.lastname || '';
    const hashPassword = await captainModel.hashPassword(password);
    const newCaptain = await createCaptain({firstname, lastname, email, password: hashPassword, status, vehicle});
    const token = newCaptain.generateAuthToken();
    res.cookie('token', token, {httpOnly: true});
    res.status(201).json({token, captain: newCaptain});
}

exports.getCaptain = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    const captainExists = await captainModel.findOne({email}).select('+password');
    if(!captainExists){
        return res.status(404).json({message: 'Captain not found'});
    }
    const isValidPassword = await captainExists.comparePassword(password);
    if(!isValidPassword){
        return res.status(401).json({message: 'Invalid password'});
    }
    const token = captainExists.generateAuthToken();
    res.status(200).json({token, captain: captainExists});
}

exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({captain: req.captain});
}

exports.logoutCaptain = async (req, res) => {
    res.clearCookie('token');
    await BlackListing.create({
        token: req.cookies.token || req.headers.authorization?.split(" ")[1],
    });
    res.status(200).json({message: 'Logged out successfully'});
}

exports.updateCaptainStatus = async (req, res) => {
    const { status } = req.body;
    const captainExists = await captainModel.findById(req.captain._id);
    if(!captainExists){
        return res.status(404).json({message: 'Captain not found'});
    }
    captainExists.status = status;
    await captainExists.save();
    res.status(200).json({captain: captainExists});
}