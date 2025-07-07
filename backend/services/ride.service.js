const rideSchema = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');

const prices = {
  moto: {
    baseFare: 20,
    perkm: 5,
    permin: 1,
    fare(dist, time) {
      return this.baseFare +
        this.perkm * Math.round(dist / 1000) +
        this.permin * Math.round(time / 60);
    }
  },
  auto: {
    baseFare: 35,
    perkm: 8,
    permin: 2,
    fare(dist, time) {
      return this.baseFare +
        this.perkm * Math.round(dist / 1000) +
        this.permin * Math.round(time / 60);
    }
  },
  car: {
    baseFare: 75,
    perkm: 12,
    permin: 3,
    fare(dist, time) {
      return this.baseFare +
        this.perkm * Math.round(dist / 1000) +
        this.permin * Math.round(time / 60);
    }
  }
};

async function fareCalculator(pickup, destination) {

  // Convert both pickup and destination to lat,lng
  const pickupCoords = await mapService.getCoordinatesFromAddress(pickup);
  const destCoords = await mapService.getCoordinatesFromAddress(destination);

  const pickupLatLng = `${pickupCoords.ltd},${pickupCoords.lng}`;
  const destLatLng = `${destCoords.ltd},${destCoords.lng}`;


  // Get distance (in meters) and duration (in seconds)
  const disDur = await mapService.getDistanceTime(pickupLatLng, destLatLng);

  const distance = disDur.distance; // in meters
  const duration = disDur.duration; // in seconds
//   if (typeof distance !== 'number' || typeof duration !== 'number') {
//     throw new Error('Distance or duration is invalid');
//   }

  return {
    fareObj: {
      motorcycle: prices.moto.fare(distance, duration),
      auto: prices.auto.fare(distance, duration),
      car: prices.car.fare(distance, duration)
    },
    distance, // in meters
    duration // in seconds
  };
}

function generateOtp(num) {
    // Generate a random integer, pad with zeros if needed
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}

const createRide = async ({ pickup, destination, user, vehicleType }) => {
    if(!pickup || !destination || !user || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fareObj = await fareCalculator(pickup, destination);
    // const {fare, distance, duration} = fareObj;
    
    // for vehicle type req.
    const ride = await rideSchema.create({ pickup, destination,fare:fareObj, user, vehicleType, otp: generateOtp(6) }); 
    // const ride = await rideSchema.create({ pickup, destination,fare:fareObj, user, otp: generateOtp(6) });
    // console.log("Created rice",ride); 
    return ride;
}

const acceptRideService = async (rideId, captain) => {    
    const findRideInDb = await rideSchema.findOneAndUpdate({ _id: rideId }, { status: 'accepted', captain : captain._id }, { new: true });
    console.log("findRideInDb",findRideInDb);
    if(!findRideInDb) {
        throw new Error('Ride not found');
    }
    const ride = await rideSchema.findById(rideId).populate('user').populate('captain').select('+otp');
    console.log("ride",ride);
    return ride;
}

const otpVerifyService = async ({otp, rideId, captain}) => {
    const findRideInDb = await rideSchema.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if(!findRideInDb) {
        throw new Error('Ride not found');
    }
    if(findRideInDb.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    const updatedRide = await rideSchema.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' }, { new: true }).populate('user').populate('captain');
    return updatedRide; 
}

const endRideService = async (rideId, captain) => {
    const findRideInDb = await rideSchema.findOne({ _id: rideId, captain: captain._id }).populate('user').populate('captain').select('+otp');
    if(!findRideInDb) {
        throw new Error('Ride not found');
    }
    const updatedRide = await rideSchema.findOneAndUpdate({ _id: rideId }, { status: 'completed' }, { new: true }).populate('user').populate('captain');
    return updatedRide; 
}


module.exports = { fareCalculator, generateOtp, createRide, acceptRideService, otpVerifyService, endRideService };