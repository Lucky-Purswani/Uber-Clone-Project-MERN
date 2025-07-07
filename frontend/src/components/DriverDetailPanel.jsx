import { FaStar, FaShieldAlt, FaShareAlt, FaPhoneAlt } from 'react-icons/fa'
import { IoSend } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { FaSquare } from "react-icons/fa";
import { useState, useContext, useEffect } from 'react'
import { SocketDataContext } from '../context/SocketContext'
import { RideDataContext } from '../context/RideContext';
import linkArr from '../components/linkArr';


function DriverDetailPanel({setdriverDetailPanelOpen, setsearchingForVehiclePanelOpen, removeUnecessaryThings}) {
    const { socket } = useContext(SocketDataContext);
    const [driverDetails, setdriverDetails] = useState({})
    const {ride, setRide} = useContext(RideDataContext);
    const {captain, pickup, destination, otp} = ride || {};
    const {firstname, lastname} = captain?.fullname || {};
    const {plate, color, capacity, vehicleType} = captain?.vehicle || {};
    const minutes = Math.round(ride?.fare.duration / 60);
    // const linkArr = [
    //   // {
    //   //   id: 1,
    //   //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnNMludPSWSkSM3A5L5YOyXNqqYaswQ-md4Q&s"
    //   // }, 
    //   {
    //     id: 2,
    //     link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwg-ZeQabT85VRgsE8zaDIAglVU7TIVwX19b80Nm7xgBdCdoXcfTAaH530nvyzox_KVM&usqp=CAU"
    //   },
    //   // {
    //   //   id: 3,
    //   //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT7hcIfGeYCA-CYkiN3wsKe5DQCBeT0YBSjxllNCVxeQJz49fbQEFtX0Q0r29L4T0frZI&usqp=CAU"
    //   // },
    //   {
    //     id: 4,
    //     link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiS3mlN52NwARDGg5mHEGlmEHz5DdI9gQkkCTxwhGqBaOUYFegNbJjd5Qwl2ehRiQsKtg&usqp=CAU"
    //   },
    //   {
    //     id: 5,
    //     link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNtIXDQIc6QJAk7spM-uRFk3T71lVCWwho4r7w0wCJqWXDM2_6Lyw9w686pAoOqdy9eM&usqp=CAU"
    //   }
    // ];
    const randomImg = linkArr[Math.floor(Math.random() * linkArr.length)].link;

  

    useEffect(() => {
    const handleRideAccepted = (data) => {
      // ✅ Safe check before calling optional props
      if (typeof setsearchingForVehiclePanelOpen === 'function') {
        setsearchingForVehiclePanelOpen(false);
      }
      if (typeof setdriverDetailPanelOpen === 'function') {
        setdriverDetailPanelOpen(true);
      }
      setRide(data);
    };

    const handleOtpVerified = (data) => {
      setRide(data);
    };

    socket.on('ride-accepted', handleRideAccepted);
    socket.on('otp-verified', handleOtpVerified);

    return () => {
      socket.off('ride-accepted', handleRideAccepted);
      socket.off('otp-verified', handleOtpVerified);
    };
  }, [socket, setRide, setsearchingForVehiclePanelOpen, setdriverDetailPanelOpen]);



  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg px-4 pb-3">
      
      {/* Meet at the pickup point (conditional like OTP) */}
    {!otp && (
      <div className="w-full flex justify-between items-center py-2 mb-2">
        <span className="text-base font-semibold text-gray-900">
          Meet at the pickup point
        </span>
        {/* Estimated time box */}
        <span className="bg-black text-white px-3 py-1 rounded-lg text-lg font-semibold">
          {minutes} min
        </span>
      </div>
    )}
    {!otp && (
      <div className='line my-2 h-[1px] bg-gray-200 w-screen'/>
    )}

      {/* Driver and Car Info */}
      <div className="flex justify-between px-4 items-center py-4 bg-white">
  <div className="flex justify-center items-center relative w-full">
    <img
      src={`${randomImg}`}
      alt="driver"
      className="w-14 h-14 rounded-full absolute left-0 object-cover z-20 border-2 border-white shadow"
    />
    <img
      src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
      alt="car"
      className="w-28 h-14 absolute left-6 rounded-lg object-cover"
    />
  </div>

  <div className="flex flex-col justify-center items-end ml-3 w-[50%] space-y-1">
    {/* Name */}
    <span className="text-lg font-semibold text-gray-900 capitalize">
      {`${firstname} ${lastname}`}
    </span>

    {/* Vehicle Type Badge */}
    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full capitalize tracking-wide">
      {vehicleType}
    </span>

    {/* Plate Number */}
    <div className="bg-white text-black px-4 py-1 rounded-md text-base font-mono tracking-wider border border-gray-400 shadow-sm">
      {plate}
    </div>

    {/* OTP */}
    <span className="text-xs text-gray-500 font-medium">
      {`${otp ? "OTP: " : ""}`} <span className="text-gray-800 font-semibold">{otp}</span>
    </span>
  </div>
</div>


      {/* Message input */}
      <div className={`bg-gray-100 rounded-lg px-4 py-2 flex items-center mb-4 ${removeUnecessaryThings ? "hidden" : ""}`}>
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
        <div className="flex justify-start gap-2 items-center mb-1">
          <IoLocationSharp className='w-5 h-5'/>
          <span className="font-semibold text-base">Pickup</span>
        </div>
        <div className="text-gray-700 text-sm pl-6">
          {pickup}  
        </div>
      </div>
   
      {/* Dropoff Address */}
      <div className="border-t pt-3 my-2">
        <div className="flex justify-start items-center gap-2 mb-1">
          <FaSquare className='w-4 h-4'/>
          <span className="font-semibold text-base">Destination</span>
        </div>
        <div className="text-gray-700 text-sm pl-6">
          {destination}
        </div>
      </div>
    </div>
  )
}

export default DriverDetailPanel