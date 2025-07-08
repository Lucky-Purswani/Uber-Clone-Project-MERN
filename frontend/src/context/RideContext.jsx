// context/RideContext.js
import axios from 'axios';
import React, {  useState } from 'react';


export const RideDataContext = React.createContext();
// Default empty ride structure matching your schema
const defaultRide = {
  pickup: '',
  destination: '',
  distance: 0,
  duration: 0,
  fare: 0,
  user: '',
  captain: '',
  status: 'pending',
  paymentId: '',
  orderId: '',
  signature: '',
  vehicleType: '',
  otp: '',
};




export const RideContext = ({ children }) => {
  const [ride, setRide] = useState(defaultRide);

  const updatePickupAndDestination = (pickup, destination) => {
    setRide(prev => ({
      ...prev,
      pickup,
      destination,
    }));
  };

  const getVehicleRideInfo = async (pickup, destination) => {
    try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}ride/request`,
          {
            pickup,
            destination
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
            },
          }
        );

      const { distance, duration, fare} = res.data
      setRide(prev => ({
        ...prev,
        pickup,
        destination,
        distance,
        duration,
        fare,
      }));

    } catch (error) {
      console.error("Error fetching ride info:", error);
    }
  };
  

  // Function to reset ride (e.g., after ride completes or user cancels)
  const resetRide = () => {
    setRide(defaultRide);
  };

   

  return (
    <RideDataContext.Provider value={{ ride, setRide, resetRide, updatePickupAndDestination, getVehicleRideInfo }}>
      {children}
    </RideDataContext.Provider>
  );
};

