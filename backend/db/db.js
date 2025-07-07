const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');


function connectDB() {
  return mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB connected successfully');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  });
}
module.exports = connectDB;