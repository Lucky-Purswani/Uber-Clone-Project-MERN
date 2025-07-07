const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
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
});

userSchema.methods.webToken = function () {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function (password) {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('user', userSchema);