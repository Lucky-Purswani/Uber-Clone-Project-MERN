import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa";
import { CaptainDataContext } from '../context/CaptainContext';
import { useContext } from 'react';
import axios from 'axios';

function NewRidePopUpPanel({rideOnCaptainSide, setrideAcceptIgnorePanelOpen, setacceptedRideUserDetailPanelOpen}) {
    const {pickup , destination, fare, vehicleType } = rideOnCaptainSide || {};
    const {captain} = useContext(CaptainDataContext);
    console.log("This is captain data from context", captain);
    const response  = async (e) =>{
        await axios.post(`${import.meta.env.VITE_BASE_URL}ride/accept`, {rideId:rideOnCaptainSide._id, captain}, 
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            }
        );
        console.log("Inside",response.data);
    }

   return (
    <div className='flex flex-col py-4'>
            <h5 className='text-2xl font-medium inline-flex items-center justify-center w-full'>New ride for you</h5>
            {/* <img className='w-[70%] mx-auto my-3' src="https://img.freepik.com/premium-vector/car-audio-vector-illustration-featuring-musical-car-loudspeakers-sound-system-music-automobile-flat-style-cartoon-background_2175-29468.jpg?semt=ais_hybrid&w=740" alt="" /> */}
            <img className='w-[70%] mx-auto' src="https://img.freepik.com/free-vector/female-driver-using-car-sharing-service_74855-4790.jpg?semt=ais_hybrid&w=740" alt="" />
            <div className='line w-full h-[1px] bg-gray-200 my-1'/>
            {/* Pickup location */}
            <div className='flex gap-4 px-6 py-2 justify-start items-center rounded-lg'>
                <IoLocationSharp className='h-7 w-7'/>
                <div>
                    <p className='text-lg font-medium'>Pickup Location</p>
                    <p className='text-sm'>{pickup}</p>
                </div>
            </div>
            <div className='line w-[90%] mx-auto h-[1px] bg-gray-300 my-1'/>
            {/* Drop off location */}
            <div className='flex gap-4 px-6 py-2 justify-start items-center rounded-lg'>
                <FaSquare className='h-5 w-5'/>
                <div>
                    <p className='text-lg font-medium'>Drop off Location</p>
                    <p className='text-sm'>
                        {destination}
                    </p>
                </div>
            </div>
            <div className='line w-[90%] mx-auto h-[1px] bg-gray-300 my-1'/>
            {/* Cash Section */}
            <div className='flex gap-4 items-center justify-start px-6 py-2 rounded-lg'>
                <FaCreditCard  className='h-5 w-5'/>
                <div>
                    <h5 className='text-lg font-medium'>₹{fare?.fareObj[vehicleType]}</h5>
                    <p className='text-sm'>Cash {vehicleType}</p>
                </div>
            </div>
            <div className='flex'>
                <button onClick={() =>{
                    setrideAcceptIgnorePanelOpen(prev => !prev)
                    setacceptedRideUserDetailPanelOpen(prev => !prev)
                    response();
                }} type='button' className='w-[45%] mx-auto bg-black text-white py-2 rounded-lg my-2'>Accept</button>
                <button onClick={() => setrideAcceptIgnorePanelOpen(prev => !prev)} type='button' className='w-[45%] mx-auto bg-gray-300 text-black py-2 rounded-lg my-2'>Ignore</button>
            </div>
        </div>
  )
}

export default NewRidePopUpPanel