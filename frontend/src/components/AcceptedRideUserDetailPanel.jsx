import React, { useState, useContext, useRef } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaUser, FaSquare } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { SocketDataContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import linkArr from './linkArr';


function AcceptedRideUserDetailPanel({rideOnCaptainSide, setacceptedRideUserDetailPanelOpen, acceptedRideUserDetailPanelOpen }) {
  // if (acceptedRideUserDetailPanelOpen) {
  //   console.log("Final update data ",rideOnCaptainSide);
  // }
  const { socket } = useContext(SocketDataContext);
  const {captain } = useContext(CaptainDataContext);
  const [otp, setotp] = useState("");
  const navigate = useNavigate();
  const {pickup , destination, fare, vehicleType , user} = rideOnCaptainSide || {};

  const abortRide = async () => {
    socket.emit('abort-ride', { captainId: captain._id, rideId: rideOnCaptainSide._id });
  }

  const [randomImg] = useState(() => linkArr[Math.floor(Math.random() * linkArr.length)].link);


  const otpVerify = async () => {
    console.log("Ride on captian side",rideOnCaptainSide);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}//ride/otp-verify`, 
      {
      params: {
          otp: otp,
          rideId: rideOnCaptainSide._id
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      }
    );
    if(response.status === 200) {
      navigate('/ride-started', { state: { pickup, rideOnCaptainSide, captain, destination } });
    }
  }

  return (
    <div className='flex flex-col bg-white'>
      
      <div className='flex flex-col px-4'>
        {/* User Info Section */}
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 border-2 border-gray-100 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden'>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtMDjpPp54zoyy8mXN13_xvwaUWgVjQtwnh2JBsNEWgPE9W-Oo0kAWYOYqzBuP_UkTWsk&usqp=CAU" 
              alt="User" 
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold text-gray-800'>{`${user?.fullname?.firstname} ${user?.fullname?.lastname}`}</h3>
            
          </div>
          <div className='text-right'>
            <p className='text-2xl font-bold text-gray-800'>₹{fare?.fareObj[vehicleType]}</p>
            <p className='text-sm text-gray-500'>Cash</p>
          </div>
        </div>

        <div className='line w-full h-[1px] bg-gray-200 mb-4'/>

        {/* Location Details */}
        <div className='space-y-4 mb-6'>
          {/* Pickup location */}
          <div className='flex gap-4 justify-start items-start'>
            <div className='mt-1'>
              <IoLocationSharp className='h-4 w-4'/>
            </div>
            <div className='flex-1'>
              <p className='text-lg font-medium text-gray-800'>Pickup Location</p>
              <p className='text-sm text-gray-600'>{pickup}</p>
            </div>
          </div>

          <div className='line w-[90%] mx-auto h-[1px] bg-gray-300'/>

          {/* Drop off location */}
          <div className='flex gap-4 justify-start items-start'>
            <div className='mt-1'>
              <FaSquare className='h-4 w-4'/>
            </div>
            <div className='flex-1'>
              <p className='text-lg font-medium text-gray-800'>Drop off Location</p>
              <p className='text-sm text-gray-600'>
                {destination}
              </p>
            </div>
          </div>
        </div>

        <div className='line w-full h-[1px] bg-gray-200 mb-4'/>

        {/* Additional Info */}
        {/* <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 mb-2 shadow-sm'>
          <div className='flex items-center gap-4 mb-4'>
            <span className='bg-green-100 p-2 rounded-full'>
              <FaCreditCard  className='h-5 w-5 text-gray-600'/>
            </span>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Payment Method</p>
              <p className='text-sm text-gray-500'>Cash Payment</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <span className='bg-blue-100 p-2 rounded-full'>
              <FaUser  className='h-5 w-5 text-gray-600'/>
            </span>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Ride Type</p>
              <p className='text-sm text-gray-500'>Standard Ride</p>
            </div>
          </div>
        </div> */}

        {/* OTP Input Section */}
        <div className='flex flex-col items-center w-[60%] mx-auto my-2'>
          {/* <label htmlFor="otp" className='text-sm font-semibold mb-2 text-gray-700 tracking-wide'>Enter OTP</label> */}
          <input
            id="otp"
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            className="w-full px-5 py-3 border font-mono tracking-wide border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-center text-lg bg-white shadow-sm transition-all duration-150"
          />
        </div>
        <div className='space-y-3 mt-4'>
          <button
            onClick={() => otpVerify()}
            type='button' 
            className='w-full inline-flex justify-center items-center bg-black text-white py-3 rounded-lg font-semibold text-lg transition-colors'
          >
            Start Journey
          </button>
          <button 
            onClick={() =>{ setacceptedRideUserDetailPanelOpen(prev => !prev) 
              abortRide()
            }
            }
            type='button' 
            className='w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 text-lg rounded-lg font-semibold transition-colors'
          >
            Cancel Ride
          </button>
        </div>
      </div>
    </div>
  )
}

export default AcceptedRideUserDetailPanel