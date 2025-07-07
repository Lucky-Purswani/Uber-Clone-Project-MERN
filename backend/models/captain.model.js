const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long'],
        },
        lastname: {
            type: String,
            minlength: [2, 'Last name must be at least 2 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false, // Exclude password from queries by default
    },
    socketId: {
        type: String,
        default: null, // Default value for socketId
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    vehicle:{
        color: {
            type: String,
            required: true,
            minlength: [2, 'Color must be at least 2 characters long'],
        },
        plate:{
            type: String,
            required: true,
            minlength: [2, 'Plate must be at least 2 characters long'],
        }, 
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 2 characters long'],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['motorcycle', 'car', 'auto'],
        }
    }, 
    location:{
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    return token;
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('captain', captainSchema);
