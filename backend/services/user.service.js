const User = require('../models/user.model');
const Captain = require('../models/captain.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if(!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = User.create({
        fullname: {
            firstname,
            lastname: lastname || ''
        },
        email,
        password
    });
    return user;
}

module.exports.createCaptain = async ({ firstname, lastname, email, password, status, vehicle  }) => {
    if(!firstname || !email || !password || !status || !vehicle) {
        throw new Error('All fields are required');
    }
    const captain = Captain.create({
        fullname: {
            firstname,
            lastname: lastname || ''
        },
        email,
        password,
        status,
        vehicle
    });
    return captain;
}