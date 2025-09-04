# Uber Clone Project

A full-stack Uber clone application built with React, Node.js, Express, and MongoDB.

## 📋 Features

- Real-time ride tracking and updates
- User and Captain (Driver) authentication
- Route visualization using Google Maps
- Distance and fare calculation
- OTP verification for ride start
- Socket.IO integration for real-time communication

## 🏗 Architecture

### Frontend (`/frontend`)

#### Components
- **Authentication**
  - `Login.jsx` - User login component
  - `CaptainLogin.jsx` - Captain login component
  - `Register.jsx` - User registration
  - `CaptainRegister.jsx` - Captain registration

- **Maps & Location**
  - `CurrentLocationMap.jsx` - Shows current location
  - `RouteInMap.jsx` - Displays ride route with markers
  - `PickupRouteMap.jsx` - Shows route to pickup location

- **Ride Flow**
  - `DriverDetailPanel.jsx` - Captain and vehicle details
  - `RideConfirmationPanel.jsx` - Ride confirmation UI
  - `AcceptedRideUserDetailPanel.jsx` - Ride details after acceptance
  - `SearchingForVehiclePanel.jsx` - Loading state while finding ride

- **Protected Routes**
  - `UserProtectedWrapper.jsx`
  - `CaptainProtectedWrapper.jsx`
  - `UserRidingProtectedWrapper.jsx`
  - `CaptainRidingProtectedWrapper.jsx`

#### Pages
- `Home.jsx` - Main user dashboard
- `CaptainHome.jsx` - Captain dashboard
- `Riding.jsx` - Active ride view
- `RideStarted.jsx` - Ongoing ride view

### Backend (`/backend`)

#### Models
- `user.model.js` - User schema
- `captain.model.js` - Captain schema with vehicle details
- `ride.model.js` - Ride information schema

#### Routes
- `/auth` - Authentication endpoints
- `/users` - User management
- `/captains` - Captain management
- `/ride` - Ride operations
- `/map` - Location and routing services

#### Services
- `auth.service.js` - Authentication logic
- `map.service.js` - Google Maps integration
- `ride.service.js` - Ride management
- `socket.service.js` - Real-time updates

## 🚀 Setup & Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Environment Setup:
Create `.env` files in both frontend and backend:

```env
# Backend .env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Frontend .env
VITE_GOOGLE_MAP_API=your_google_maps_key
VITE_BASE_URL=http://localhost:5000
```

4. Start the servers:
```bash
# Backend
npm start

# Frontend
npm run dev
```

## 🔒 Security Features

- JWT authentication
- Protected routes
- OTP verification
- Role-based access control
- Socket room management

## 🌐 Real-time Features

- Live location tracking
- Instant ride updates
- Captain-User chat
- Ride status notifications

## 🛠 Tech Stack

- **Frontend**: React, TailwindCSS, GSAP, Socket.IO Client
- **Backend**: Node.js, Express, MongoDB, Socket.IO
- **Maps**: Google Maps API
- **State Management**: React Context
- **Authentication**: JWT

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop views
- Tablet views
- Mobile views

## 🔄 Workflow

1. User requests ride
2. Nearby captains are notified
3. Captain accepts ride
4. OTP verification
5. Ride starts
6. Real-time tracking
7. Ride completion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for learning purposes.

