import React, { useContext } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { RideDataContext } from '../context/RideContext';
import { FiTarget } from "react-icons/fi";


function SearchingForVehiclePanel({ setsearchingForVehiclePanelOpen, setdriverDetailPanelOpen }) {
    const {ride} = useContext(RideDataContext);
    const {pickup, destination, vehicleType, fare} = ride || {};
    


  return (
    <div className='flex flex-col py-4'>
        <h5 className='text-2xl font-medium inline-flex items-center justify-center w-full'>Looking for a vehicle</h5>
        <img className='w-[70%] mx-auto' src="https://i.gifer.com/7HGp.gif" alt="" />
        <div className='line w-full h-[1px] bg-gray-200 my-1'/>
        {/* Pickup location */}
        <div className='flex gap-4 px-6 py-2 items-center rounded-lg'>
            <FaLocationDot className='w-7 h-7'/>
            <div>
                <p className='text-lg font-medium'>Pickup Location</p>
                <p className='text-sm'>{pickup}</p>
            </div>
        </div>
        <div className='line w-[90%] mx-auto h-[1px] bg-gray-200 my-1'/>
        {/* Drop off location */}
        <div className='flex gap-4 px-6 py-2 items-center rounded-lg'>
            <FiTarget className='w-7 h-7'/>
            <div>
                <p className='text-lg font-medium'>Drop off Location</p>
                <p className='text-sm'>
                    {destination}
                </p>
            </div>
        </div>
        
        <div className='line w-[90%] mx-auto h-[1px] bg-gray-300 my-1'/>
        {/* Cash Section */}
        <div className='flex gap-4 items-center px-6 py-2 rounded-lg'>
            <FaCreditCard className='w-5 h-5'/>
            <div>
                <h5 className='text-lg font-medium'>₹{fare[vehicleType]}</h5>
                <p className='text-sm'>Cash</p>
            </div>
        </div>
        {/* <div onClick={() => {
            setsearchingForVehiclePanelOpen(prev => !prev)
            setdriverDetailPanelOpen(prev => !prev)
        }} className='line w-[90%] mx-auto h-[1px] bg-gray-300 my-1'/> */}
    </div>
  )
}

export default SearchingForVehiclePanel