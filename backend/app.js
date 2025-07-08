const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const captainRouter = require('./routes/captain.route');
const mapRouter = require('./routes/map.route');
const rideRouter = require('./routes/ride.route');
// Connect to MongoDB
connectDB();

const allowedOrigin = 'https://uber-clone-luckypurswani.vercel.app';

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS globally and properly
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight fix

// Debug log to verify
app.use((req, res, next) => {
  console.log('[CORS DEBUG] Origin:', req.headers.origin);
  next();
});


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/captains', captainRouter); 
app.use('/map', mapRouter);  
app.use('/ride', rideRouter);

module.exports = app;