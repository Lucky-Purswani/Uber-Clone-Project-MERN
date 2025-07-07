import React, { useContext, useEffect, useState } from 'react'
import { IoMdPerson, IoIosArrowDown } from "react-icons/io";
import { RideDataContext } from '../context/RideContext';
import axios from 'axios';
import Loader from './Loader';



function RideSelectPage({ pickup, destination, setvehiclePanelOpen, setrideConfirmationPanelOpen}) {
  const pickupLocation = pickup;
  const destinationLocation = destination;
  const [selectedRide, setselectedRide] = useState('')
  const { ride, setRide } = useContext(RideDataContext);
  const {distance, duration, fare} = ride;
  const isFareLoading = !fare || !fare.motorcycle || !fare.auto || !fare.car;

  if (isFareLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader />
      </div>
    );
  }


       
  return (
    <div className=''>
        <div className='flex flex-col gap-4'>
        <h5 onClick={() => setvehiclePanelOpen(prev => !prev)} className='inline-flex justify-between items-center mx-auto'><IoIosArrowDown size={20}/></h5>
          {/* Rows of rides */}
          {/* <div onClick={() =>{
           setvehiclePanelOpen(prev => !prev)
           setrideConfirmationPanelOpen(prev => !prev)
          }
          } className='flex justify-evenly active:border-gray-600 p-3 gap-2 border-2 items-center border-gray-100 rounded-lg'>
            <img className='h-12 bg-opacity-100' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
            <div>
                <h5 className='inline-flex gap-2 font-medium'>UberGo <span className='inline-flex items-center text-base font-normal'> <IoMdPerson size={18}/> 4</span></h5>
                <h1 className='text-base'>2 mins away</h1>
                <h1 className='text-sm'>Affordable, comfortable rides</h1>
            </div>
            <h5 className='self-start font-medium text-lg'>₹193</h5>
          </div> */}
          <div onClick={() =>{
           setvehiclePanelOpen(prev => !prev)
           setrideConfirmationPanelOpen(prev => !prev)
           setRide(prev =>({...prev, vehicleType: 'motorcycle'}))
          //  getVehicleRideInfo(pickupLocation, destinationLocation, 'motorcycle')
          }
          }className='flex justify-evenly active:border-gray-600 p-3 gap-2 border-2 items-center border-gray-100 rounded-lg'>
            <img className='h-12 bg-opacity-100' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
            <div>
                <h5 className='inline-flex gap-2 font-medium'>Motorcycle <span className='inline-flex items-center text-base font-normal'> <IoMdPerson size={18}/> 1</span></h5>
                <h1 className='text-base'>1 mins away</h1>
                <h1 className='text-sm'>Affordable, comfortable rides</h1>
            </div>
            <h5 className='self-start font-medium text-lg'>₹{fare.motorcycle}</h5>
          </div>
          <div onClick={() =>{
           setvehiclePanelOpen(prev => !prev)
           setrideConfirmationPanelOpen(prev => !prev)
           setRide(prev =>({...prev, vehicleType: 'auto'}))
          //  getVehicleRideInfo(pickupLocation, destinationLocation, 'auto')
          }
          } className='flex justify-evenly active:border-gray-600 p-3 gap-2 border-2 items-center border-gray-100 rounded-lg'>
            <img className='h-12 bg-opacity-100' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
            <div>
                <h5 className='inline-flex gap-2 font-medium'>Auto <span className='inline-flex items-center text-base font-normal'> <IoMdPerson size={18}/> 3</span></h5>
                <h1 className='text-base'>3 mins away</h1>
                <h1 className='text-sm'>Affordable, comfortable rides</h1>
            </div>
            <h5 className='self-start font-medium text-lg'>₹{fare.auto}</h5>
          </div>
          <div onClick={() =>{
           setvehiclePanelOpen(prev => !prev)
           setrideConfirmationPanelOpen(prev => !prev)
           setRide(prev =>({...prev, vehicleType: 'car'}))
          //  getVehicleRideInfo(pickupLocation, destinationLocation, 'car')
          }
          } className='flex justify-evenly active:border-gray-600 p-3 gap-2 border-2 items-center border-gray-100 rounded-lg'>
            <img className='h-12 bg-opacity-100' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
            <div>
                <h5 className='inline-flex gap-2 font-medium'>Uber Car <span className='inline-flex items-center text-base font-normal'> <IoMdPerson size={18}/> 4</span></h5>
                <h1 className='text-base'>3 mins away</h1>
                <h1 className='text-sm'>Affordable, comfortable rides</h1>
            </div>
            <h5 className='self-start font-medium text-lg'>₹{fare.car}</h5>
          </div>
        </div>
        
    </div>
  )
}

export default RideSelectPage