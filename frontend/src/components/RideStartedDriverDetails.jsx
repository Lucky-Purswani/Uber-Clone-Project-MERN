import React from 'react'
import { FaStar, FaShieldAlt, FaShareAlt, FaPhoneAlt } from 'react-icons/fa'
import { IoSend } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { useState, useContext } from 'react'
import { SocketDataContext } from '../context/SocketContext'

function RideStartedDriverDetails() {
    const { socket } = useContext(SocketDataContext);
    const [driverDetails, setdriverDetails] = useState({})
    const {captain, pickup, destination, otp} = driverDetails || {};
    const {firstname, lastname} = captain?.fullname || {};
    const {plate, color, capacity, vehicleType} = captain?.vehicle || {};

    socket.on('otp-verified', (data) => {
      setdriverDetails(data);
      console.log("otp-verified data",data);
    })


  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-t-2xl shadow-lg px-6 py-4">
      {/* Top: Meet at pickup and ETA */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-medium">Meet at the pickup point</span>
        <div className="bg-black text-white px-3 py-1 rounded text-center flex flex-col items-center">
          <span className="text-xl font-semibold leading-none">2</span>
          <span className="text-xs leading-none">min</span>
        </div>
      </div>
      <div className='line w-full h-[1px] bg-gray-300'/>

      {/* Driver and Car Info */}
      <div className="flex items-center py-4">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="driver"
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
        />
        <img
          src="https://sb.kaleidousercontent.com/67418/1920x1100/965852e4b7/transparent.png"
          alt="car"
          className="w-20 h-14 rounded-lg object-cover"
        />
        <div className="flex flex-col items-end ml-3 w-[50%]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700 text-sm">{`${firstname} ${lastname}`}</span>
          </div>
          <div className="font-bold text-xl tracking-wider">{plate}</div>
          <div className="text-gray-600 text-sm">{vehicleType}</div>
          <div className="flex items-center text-xs">
            <FaStar className="text-black mr-1" />
            <span className="font-semibold text-gray-700">4.9</span>
          </div>
          <h4>{otp}</h4>
        </div>
      </div>

      {/* Message input */}
      <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center mb-4">
        <input
          type="text"
          placeholder="Send a message..."
          className="bg-transparent flex-1 outline-none text-gray-700"
          disabled
        />
        <IoSend size={18}/>
      </div>

      {/* Action buttons */}
      {/* <div className="flex justify-around mb-5">
        <div className="flex flex-col items-center">
          <FaShieldAlt className="text-2xl rounded-full text-blue-500 mb-1" />
          <span className="text-xs text-gray-700">Safety</span>
        </div>
        <div className="flex flex-col items-center">
          <FaShareAlt className="text-2xl text-blue-500 mb-1" />
          <span className="text-xs text-gray-700">Share my trip</span>
        </div>
        <div className="flex flex-col items-center">
          <FaPhoneAlt className="text-2xl text-blue-500 mb-1" />
          <span className="text-xs text-gray-700">Call driver</span>
        </div>
      </div> */}

      {/* Pickup Address */}
      <div className="border-t pt-3 my-2">
        <div className="flex items-center mb-1">
          <span className="font-bold text-lg mr-2 text-black">•</span>
          <span className="font-semibold text-base">Pickup</span>
        </div>
        <div className="text-gray-600 text-sm pl-6">
          {pickup}
        </div>
      </div>
   
      {/* Dropoff Address */}
      <div className="border-t pt-3 my-2">
        <div className="flex items-center mb-1">
          <span className="font-bold text-lg mr-2 text-black">•</span>
          <span className="font-semibold text-base">Destination</span>
        </div>
        <div className="text-gray-600 text-sm pl-6">
          {destination}
        </div>
      </div>
    </div>
  )
}

export default RideStartedDriverDetails