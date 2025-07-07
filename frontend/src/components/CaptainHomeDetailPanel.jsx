import React, { useContext, useEffect, useState } from 'react';
import { SocketDataContext } from '../context/SocketContext';
import linkArr from './linkArr';

function CaptainHomeDetailPanel({ setonline, captain, captainStatus, setCaptainStatus }) {
  
  const statusToShow = captainStatus;
  const { socket } = useContext(SocketDataContext);
  
  useEffect(() => {
    if (captain?.status) {
      setCaptainStatus(captain.status);
      setonline(captain.status === 'active');
    }
  }, [captain?.status]);

  useEffect(() => {
    socket.on('update-captain-status', (data) => {
      if (data.captainId === captain._id) {
        setCaptainStatus(data.status);
      }
    })
  }, [statusToShow, captainStatus, setCaptainStatus]);
  console.log("statusToShow",statusToShow)
  

  // const linkArr = [
  //   // { 
  //   //   id: 2,
  //   //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNwg-ZeQabT85VRgsE8zaDIAglVU7TIVwX19b80Nm7xgBdCdoXcfTAaH530nvyzox_KVM&usqp=CAU"
  //   // },
  //   // { 
  //   //   id: 1,
  //   //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMJF2T2HcyC388DfwmIGLZx9OiOaiZT9idcbqMaXlymt4H4C4pMJEp3zVe7ANy6PEqbdg&usqp=CAU"
  //   // },
  //   // { 
  //   //   id: 6,
  //   //   link: "https://cdn4.vectorstock.com/i/1000x1000/93/48/male-paramedic-avatar-character-icon-vector-30899348.jpg"
  //   // },
  //   // { 
  //   //   id: 7,
  //   //   link: "https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg"
  //   // },
  //   { 
  //     id: 8,
  //     link: "https://thumbs.dreamstime.com/b/cartoon-smiling-boy-vector-illustration-avatar-profile-picture-use-vibrant-young-wearing-casual-hoodie-character-364611515.jpg"
  //   },
  //   // {
  //   //   id: 4,
  //   //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiS3mlN52NwARDGg5mHEGlmEHz5DdI9gQkkCTxwhGqBaOUYFegNbJjd5Qwl2ehRiQsKtg&usqp=CAU"
  //   // },
  //   // {
  //   //   id: 5,
  //   //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNtIXDQIc6QJAk7spM-uRFk3T71lVCWwho4r7w0wCJqWXDM2_6Lyw9w686pAoOqdy9eM&usqp=CAU"
  //   // },
  //   // {
  //   //   id: 3,
  //   //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBuFXgq3jf1eqWCDpBWJqlhH9d6ANbAa9dA&s"
  //   // }
  // ];

  // Mock captain data for demo
  // const mockCaptain = {
  //   fullname: { firstname: 'Luc', lastname: 'Luc' },
  //   vehicle: { color: 'red', plate: 'AB12XYZ', capacity: 2, vehicleType: 'auto' },
  //   email: 'luc@gmail.com',
  //   status: 'inactive',
  //   location: { ltd: 23.11857276701393, lng: 72.5590215066649 },
  //   socketId: "hoBScZPmorpGN02sAAAF",
  //   _id: "68556285fc9a3e4d2a4e3d8b"
  // };

  const captainData = captain || mockCaptain;
  const [randomImg] = useState(() => linkArr[Math.floor(Math.random() * linkArr.length)].link);

  const { fullname, vehicle, email, status } = captainData;
  const { firstname, lastname } = fullname || {};
  const { color, plate, capacity, vehicleType } = vehicle || {};
  const trimmedPlate = plate?.replace(/\s+/g, '')?.length > 10
  ? plate.replace(/\s+/g, '').slice(0, 8) + "..."
  : plate?.replace(/\s+/g, '');


  // Helper to get Tailwind color class safely
  const getColorClass = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-600';
      case 'blue':
        return 'bg-blue-600';
      case 'green':
        return 'bg-green-600';
      case 'yellow':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="w-full flex flex-col py-3 px-4 ">
      {/* Captain Info Section */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={randomImg}
            alt="Captain"
            className="w-12 h-12 rounded-full border-2 border-gray-400 object-contain"
          />
          <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl text-gray-800">
                {firstname} {lastname}
              </h3>
              <p className="text-gray-600 font-medium">{email}</p>
            </div>
            <span className={`px-3 py-1 capitalize rounded-full text-sm font-semibold ${statusToShow === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
              {statusToShow}
            </span>
          </div>
        </div>
      </div>

      <div className='line w-full h-[1px] my-2 bg-gray-200'/>

      {/* Vehicle Details Section */}
      <div className="bg-white ">
        <h4 className="text-gray-600 font-semibold mb-3 text-sm uppercase tracking-wide">Vehicle Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Type</p>
              <p className="font-semibold text-gray-800 capitalize">{vehicleType}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Plate</p>
              <p className="font-semibold text-gray-800 font-mono truncate max-w-[120px] overflow-hidden whitespace-nowrap">
                {trimmedPlate}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Capacity</p>
              <p className="font-semibold text-gray-800">{capacity} passengers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClass(color)}`}>
              <div className={`w-5 h-5 rounded-full ${getColorClass(color)}`}></div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Color</p>
              <p className="font-semibold text-gray-800 capitalize">{color}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptainHomeDetailPanel;