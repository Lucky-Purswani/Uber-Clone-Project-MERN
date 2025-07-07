const { createUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const BlackListing = require("../models/blackListing.model");

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname , email, password } = req.body;
    const firstname = fullname.firstname;
    const lastname = fullname.lastname || '';
    const hashPassword = await userModel.hashPassword(password);
    const newUser = await createUser({ firstname, lastname, email, password: hashPassword });
    const token = newUser.webToken();
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ token, user: newUser });
};

exports.getUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    const userExists = await userModel.findOne({ email: email }).select('+password');
    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await userExists.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = userExists.webToken();
    res.status(200).json({ token, user: userExists });
}

exports.getUserProfile = async (req, res) => {
    res.status(200).json({ user: req.user });
}

exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    

    await BlackListing.create({
        token: req.cookies.token || req.headers.authorization?.split(" ")[1],
    });
    res.status(200).json({ message: 'Logged out successfully' });
}