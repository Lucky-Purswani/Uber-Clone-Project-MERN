import React from 'react'
import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa'
import { FiTarget } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import linkArr from './linkArr';

function FinishRideConfirmationPanel({rideOnCaptainSide}) {
  const navigate = useNavigate();

  // const linkArr = [
  //     // {
  //     //   id: 1,
  //     //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnNMludPSWSkSM3A5L5YOyXNqqYaswQ-md4Q&s"
  //     // }, 
  //     {
  //       id: 2,
  //       link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwg-ZeQabT85VRgsE8zaDIAglVU7TIVwX19b80Nm7xgBdCdoXcfTAaH530nvyzox_KVM&usqp=CAU"
  //     },
  //     // {
  //     //   id: 3,
  //     //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT7hcIfGeYCA-CYkiN3wsKe5DQCBeT0YBSjxllNCVxeQJz49fbQEFtX0Q0r29L4T0frZI&usqp=CAU"
  //     // },
  //     {
  //       id: 4,
  //       link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiS3mlN52NwARDGg5mHEGlmEHz5DdI9gQkkCTxwhGqBaOUYFegNbJjd5Qwl2ehRiQsKtg&usqp=CAU"
  //     },
  //     {
  //       id: 5,
  //       link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNtIXDQIc6QJAk7spM-uRFk3T71lVCWwho4r7w0wCJqWXDM2_6Lyw9w686pAoOqdy9eM&usqp=CAU"
  //     }
  //   ];
    const randomImg = linkArr[Math.floor(Math.random() * linkArr.length)].link;


  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}ride/end-ride`, {rideId:rideOnCaptainSide._id}, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
    if(response.status === 200) {
      navigate('/captain-home');
    }
  }



  return (
    <div className="w-full bg-white rounded-t-md shadow-2xl px-6 pt-6 pb-6">
      <h2 className="text-xl font-bold text-black mb-5">Finish this Ride</h2>
      
      {/* User and Distance */}
      <div className="flex items-center justify-between bg-neutral-50 rounded-lg px-4 py-3 mb-5">
        <div className="flex items-center gap-3">
          <img
          src={`${randomImg}`}
          alt="driver"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <span className="font-semibold text-base text-black">{`${rideOnCaptainSide?.user?.fullname.firstname} ${rideOnCaptainSide?.user?.fullname.lastname}`}</span>
        </div>
        <span className="font-bold text-base text-black">{rideOnCaptainSide?.fare.distance / 1000} km</span>
      </div>

      {/* Pickup */}
      <div className="flex items-start justify-start gap-3 mb-4">
        <FaMapMarkerAlt className="w-6 h-6" />
        <div>
          <div className="font-semibold text-base text-black">{`Pickup Location`}</div>
          <div className="text-sm text-gray-600">{rideOnCaptainSide?.pickup}</div>
        </div>
      </div>

      {/* Dropoff */}
      <div className="flex items-start justify-start gap-3 mb-4 border-t border-gray-200 pt-4">
        <FiTarget className="w-6 h-6" />
        <div>
          <div className="font-semibold text-base text-black">{`Dropoff Location`}</div>
          <div className="text-sm text-gray-600">{rideOnCaptainSide?.destination}</div>
        </div>
      </div>

      {/* Payment */}
      <div className="flex items-center gap-3 border-t border-gray-200 pt-4 mb-6">
        <FaMoneyBillWave className="text-xl text-black" />
        <div>
          <div className="font-semibold text-base text-black">{`Payment`}</div>
          <div className="text-sm text-gray-600">₹ {rideOnCaptainSide?.fare?.fareObj[rideOnCaptainSide?.vehicleType]}</div>
        </div>
      </div>

      {/* Finish Ride Button */}
      <button
        onClick={() => {endRide()}}
        className="w-full inline-flex items-center justify-center bg-black text-white font-bold text-lg py-3 rounded-xl shadow transition"
      >
        Finish Ride
      </button>
    </div>
  )
}

export default FinishRideConfirmationPanel