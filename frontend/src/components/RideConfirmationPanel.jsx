import React, { useContext, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import {  FaCar } from "react-icons/fa";
import { RideDataContext } from '../context/RideContext';
import { FiTarget } from "react-icons/fi";
import axios from 'axios';
import Loader from './Loader';
import { PulseLoader } from 'react-spinners';

// {/* <PulseLoader color="#000000" /> */}


function RideConfirmationPanel({ setsearchingForVehiclePanelOpen, setrideConfirmationPanelOpen }) {
    const {ride} = useContext(RideDataContext);
    const {pickup, destination, vehicleType, fare} = ride || {};
    const [loading, setLoading] = useState(false);

    const getVehicleRideInfo = async (pickup, destination, vehicleType) => {
             try {
               const getVehicleRideInfo = await axios.post(
                 `${import.meta.env.VITE_BASE_URL}/ride/request`,
                 {
                  pickup: pickup,
                  destination: destination,
                  vehicleType: vehicleType,
                },
                 {
                   headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                   },
                 }
               );
               const data = getVehicleRideInfo.data;
             }catch (error) {
               console.log("Ride select page details fetch error.",error);
             }
           };

  if (loading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Loader/>
            </div>
        );
  }

  return (
    <div className='flex flex-col py-4'>
        <h5 className='text-2xl font-medium inline-flex items-center justify-center w-full'>Confirm your ride details</h5>
        <img className='w-[60%] mx-auto my-3' src="https://img.freepik.com/premium-vector/car-audio-vector-illustration-featuring-musical-car-loudspeakers-sound-system-music-automobile-flat-style-cartoon-background_2175-29468.jpg?semt=ais_hybrid&w=740" alt="" />
        {/* <img className='w-[70%] mx-auto' src="https://img.freepik.com/free-vector/female-driver-using-car-sharing-service_74855-4790.jpg?semt=ais_hybrid&w=740" alt="" /> */}
        <div className='line w-full h-[1px] bg-gray-200 my-1'/>
        {/* Pickup location */}
        <div className='flex gap-4 px-6 py-2 items-center rounded-lg'>
            <FaLocationDot className="w-7 h-7"/>
            <div>
                <p className='text-lg font-medium'>Pickup Location</p>
                <p className='text-sm'>{pickup}</p>
            </div>
        </div>
        <div className='line w-[90%] mx-auto h-[1px] bg-gray-300 my-1'/>
        {/* Drop off location */}
        <div className='flex gap-4 px-6 py-2 items-center rounded-lg'>
            <FiTarget className="w-7 h-7"/>
            <div>
                <p className='text-lg font-medium'>Drop off Location</p>
                <p className='text-sm'>
                    {destination}
                </p>
            </div>
        </div>

        {/* Vehicle Selected  */}
        <div className='line w-[90%] mx-auto h-[1px] bg-gray-300 my-1'/>
        <div className='flex gap-4 px-6 py-2 items-center rounded-lg'>
            <FaCar className="w-6 h-6" size={18}/>
            <div>
                <p className='text-lg font-medium'>Selected Vehicle</p>
                <p className='text-sm'>
                    {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}
                </p>
            </div>
        </div>

        <div className='line w-[90%] mx-auto h-[1px] bg-gray-300 my-1'/>
            {/* Cash Section  */}
            <div className='flex gap-4 items-center px-6 py-2 rounded-lg'>
                <FaCreditCard className="w-6 h-6" size={18}/>
                <div>
                <h5 className='text-lg font-medium'>₹{fare[vehicleType]}</h5>
                <p className='text-sm'>Cash</p>
                </div>
            </div>
            
            <button onClick={() =>{
            getVehicleRideInfo(pickup, destination, vehicleType)
            setrideConfirmationPanelOpen(prev => !prev)
            setsearchingForVehiclePanelOpen(prev => !prev)
        }} className='w-[90%] mx-auto bg-black text-white py-2 rounded-lg my-2'>Confirm</button>
    </div>
  )
}

export default RideConfirmationPanel