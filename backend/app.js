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

const allowedOrigin = 'https://uber-clone-50cr.onrender.com';

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

console.log('🛠️ Listing registered routes...');
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log('[ROUTE]', middleware.route.path);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log('[NESTED ROUTE]', handler.route.path);
      }
    });
  }
});

app.use('/users', userRouter);
app.use('/captains', captainRouter); 
app.use('/map', mapRouter);  
app.use('/ride', rideRouter);

module.exports = app;