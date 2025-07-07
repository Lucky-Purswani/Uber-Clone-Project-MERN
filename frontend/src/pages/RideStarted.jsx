import React, { useState, useRef, useContext, useEffect } from 'react';
import DriverDetailPanel from '../components/DriverDetailPanel';
import FinishRideConfirmationPanel from '../components/FinishRideConfirmationPanel';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import RouteInMap from '../components/RouteInMap';
import { CaptainDataContext } from '../context/CaptainContext';
import { MapContext } from '../context/MapContext'; // <-- Add this import
import axios from 'axios';
import { RideDataContext } from '../context/RideContext';

function RideStarted() {
  
  const {ride } = useContext(RideDataContext);
  console.log("Test for riding wrapper", ride);
  const finishRideConfirmationRef = useRef(null);
  const [finishRideConfirmationPanelOpen, setfinishRideConfirmationPanelOpen] = useState(false);

  const location = useLocation();
  const {pickup, rideOnCaptainSide, captain, destination} = location.state || {};

  const { setPickupMap, setDestinationMap } = useContext(MapContext); // <-- Add this line



  const [pickupCoords, setPickupCoords] = useState(null);

  // Extract pickup address
  // const pickupAddress = rideOnCaptainSide?.pickup?.address;

  // Call API to convert address to lat/lng
  useEffect(() => {
    if (pickup) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/map/coordinates`, {
          params: { address: pickup },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPickupCoords({ lat: res.data.ltd, lng: res.data.lng });
          setPickupMap({ lat: res.data.ltd, lng: res.data.lng });
        })
        .catch((err) => {
          console.error('Failed to fetch pickup coordinates', err);
        });
    }
    if (destination) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/map/coordinates`, {
          params: { address: destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPickupCoords({ lat: res.data.ltd, lng: res.data.lng });
          setDestinationMap({ lat: res.data.ltd, lng: res.data.lng });
        })
        .catch((err) => {
          console.error('Failed to fetch pickup coordinates', err);
        });
    }
  }, [pickup, setPickupMap, destination, setDestinationMap]);

  const captainLocation = captain?.location && {
    lat: captain.location.ltd,
    lng: captain.location.lng,
  };

  useGSAP(() => {
    if (finishRideConfirmationPanelOpen) {
      gsap.to(finishRideConfirmationRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
      });
    } else {
      gsap.to(finishRideConfirmationRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      });
    }
  }, [finishRideConfirmationPanelOpen]);

  return (
    <div className="h-screen">
      <div className='absolute top-4 left-4 z-10'>
        <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
      </div>
      <div className="h-4/5">
        <img
          className="h-32 absolute -top-8 -left-4 bg-cover"
          src="https://static.wixstatic.com/media/e2cab8_62b16e028bff401c95a1f919099d86db~mv2.png/v1/fill/w_500,h_500,al_c/e2cab8_62b16e028bff401c95a1f919099d86db~mv2.png"
          alt="uberlogo"
        />
        <RouteInMap pickup={pickupCoords} captainLocation={captainLocation} />
      </div>

      <div className="h-1/5 bg-white flex flex-col justify-center py-2 items-center rounded-t-md px-6 shadow-2xl border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <svg width="22" height="22" fill="black" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="text-lg font-bold text-black tracking-wide">
            {rideOnCaptainSide?.fare.distance / 1000} km away from destination
          </span>
        </div>
        <button
          onClick={() => setfinishRideConfirmationPanelOpen((prev) => !prev)}
          className=" bg-black text-white px-10 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-gray-900 transition-all duration-200"
        >
          Complete Ride
        </button>
      </div>

      <div ref={finishRideConfirmationRef} className="fixed bottom-0 w-full">
        <FinishRideConfirmationPanel rideOnCaptainSide={rideOnCaptainSide} />
      </div>
    </div>
  );
}

export default RideStarted;
