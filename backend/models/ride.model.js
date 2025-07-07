const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        // required: true,
    },
    duration: {
        type: Number,
        // required: true,
    },
    fare: {
        type: Object,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
    },
    paymentId: {
        type: String,
    },
    orderId:{
        type: String
    }, 
    signature: {
        type: String
    },
    vehicleType: {
        type: String,
        enum: ['car', 'motorcycle', 'auto']
        // required: true
    },
    otp: {
        type: String,
        required: true, 
        select: false
    }
});

module.exports = mongoose.model('ride', rideSchema);
    