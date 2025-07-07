const axios = require('axios');
const Captain = require('../models/captain.model');

async function getCoordinatesFromAddress(address) {
    const apiKey = process.env.GOOGLE_MAP_API;
  const encodedAddress = encodeURIComponent(address)
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    if (
      response.data.status === 'OK' &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location
      return { ltd: location.lat, lng: location.lng }
    } else {
      throw new Error('No results found for the given address.')
    }
  } catch (error) {
    throw new Error('Failed to fetch coordinates: ' + error.message)
  }
}

async function getDistanceTime(origin, destination) {
  // console.log(origin, destination)
  const apiKey = process.env.GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (
      response.data.status === 'OK' &&
      response.data.rows &&
      response.data.rows.length > 0 &&
      response.data.rows[0].elements &&
      response.data.rows[0].elements.length > 0
    ) {
      const element = response.data.rows[0].elements[0];
      const distance = element.distance?.value; // in meters
      const duration = element.duration?.value; // in seconds
      console.log(distance, duration)
      return { distance, duration };
    } else {
      throw new Error('No results found for the given address.');
    }
  } catch (error) {
    throw new Error('Failed to fetch coordinates: ' + error.message);
  }
}

async function getSuggestions(address) {
  const apiKey = process.env.GOOGLE_MAP_API;
  const encodedAddress = encodeURIComponent(address)
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedAddress}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    if (
      response.data.status === 'OK' &&
      response.data.predictions &&
      response.data.predictions.length > 0
    ) {
      return response.data.predictions
    } else {
      throw new Error('No results found for the given address.')
    }
  } catch (error) {
    throw new Error('Failed to fetch coordinates: ' + error.message)
  }
}

async function getCaptainsInRadius(ltd, lng, radius, vehicleType) {
  // Convert radius to radians (Earth radius ≈ 6378 km)
  const radiusInRadians = radius / 6378;
  console.log("Vehicle check in getCaptainsInRadius",vehicleType);

  // Assumes captain.model has a 'location' field with GeoJSON { type: "Point", coordinates: [lng, lat] }
  return Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radiusInRadians]
      }
    },
    "vehicle.vehicleType": vehicleType
  });
}

module.exports = { getCoordinatesFromAddress, getDistanceTime, getSuggestions, getCaptainsInRadius };