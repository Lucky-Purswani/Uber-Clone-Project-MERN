import React, { useState, useRef, useContext, useEffect } from 'react'
import {useGSAP } from '@gsap/react'
import gsap from 'gsap';
import DriverDetailPanel from '../components/DriverDetailPanel'
import { IoIosArrowDown} from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketDataContext } from '../context/SocketContext';
import RouteInMap from '../components/RouteInMap';
import axios from 'axios';
import { MapContext } from "../context/MapContext";
import { RideDataContext } from '../context/RideContext';




function Riding() {
    const {ride } = useContext(RideDataContext);
    console.log("Test for riding wrapper", ride);
    const { setPickupMap, setCaptainLocationMap, setDestinationMap } = useContext(MapContext);
    const [halfPanelToggle, sethalfPanelToggle] = useState(true);
    const driverDetailPanelRef = useRef(null);
    const upperPanelRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const { socket } = useContext(SocketDataContext);
    const [removeUnecessaryThings, setremoveUnecessaryThings] = useState(false)
    const location = useLocation();
    const { pickupAddress, captain, destinationAddress } = location.state || {};


    useEffect(() => {
      if (pickupAddress) {
        axios.get(`${import.meta.env.VITE_BASE_URL}map/coordinates`, {
          params: { address: pickupAddress }, 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        
        })
        .then(res => {
          setPickupMap({ lat: res.data.ltd, lng: res.data.lng });
          setCaptainLocationMap({ lat: captain.location.ltd, lng: captain.location.lng });
        })
        .catch(err => {
          console.error("Failed to fetch pickup coordinates", err);
        });
      }
      if (destinationAddress) {
        axios.get(`${import.meta.env.VITE_BASE_URL}map/coordinates`, {
          params: { address: destinationAddress }, 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        
        })
        .then(res => {
          setDestinationMap({ lat: res.data.ltd, lng: res.data.lng });
          setCaptainLocationMap({ lat: captain.location.ltd, lng: captain.location.lng });
        })
        .catch(err => {
          console.error("Failed to fetch pickup coordinates", err);
        });
      }
    }, [pickupAddress, setPickupMap, setCaptainLocationMap, destinationAddress, setDestinationMap]);


    useEffect(() => {
      setremoveUnecessaryThings(true);
    }, []);

  //   useEffect(() => {
  //   if (!socket || !captainId) return;
  //   const handler = (data) => {
  //     console.log("Riding handler data:", data);
  //     if (data.captainId === captainId) {
    //       setCaptainLocationMap({ lat: data.location.ltd, lng: data.location.lng });
  //     }
  //   };
  //   socket.on('update-location-captain', handler);
  //   return () => socket.off('update-location-captain', handler);
  // }, [socket, captainId, setCaptainLocationMap]);

  useEffect(() => {
    socket.on('ride-ended', (data) => {
      navigate('/home');
      console.log("Riding page", data);
    });
    return () => socket.off('ride-ended');
  }, [socket, navigate]);

    useGSAP(() => {
  if (halfPanelToggle) {
    gsap.to(driverDetailPanelRef.current, {
    //   height: "50vh",
      height: "auto",
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(upperPanelRef.current, {
      height: '50%',
      duration: 0.5
    });

    gsap.to(buttonRef.current, {
      rotate: 0,
      duration: 1
    });
  } else {
    gsap.to(driverDetailPanelRef.current, {
    //   bottom: -118,
      height: "230px",
      overflow: 'hidden',
      duration: 0.5,
      ease: 'power2.in'
    });

    gsap.to(upperPanelRef.current, {
      height: '78%',
      duration: 0.5
    });

    gsap.to(buttonRef.current, {
      rotate: 180,
      duration: 1
    });
  }
}, [halfPanelToggle]);



  return (
    <div className='h-screen relative'>
      <div className='absolute top-4 left-4 z-10'>
        <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
      </div>
        <div ref={upperPanelRef} className='h-1/2'>
            <img
                className="h-32 absolute -top-8 -left-4 bg-cover"
                src="https://static.wixstatic.com/media/e2cab8_62b16e028bff401c95a1f919099d86db~mv2.png/v1/fill/w_500,h_500,al_c/e2cab8_62b16e028bff401c95a1f919099d86db~mv2.png"
                alt="uberlogo"
            />
            <RouteInMap
            />
        </div>
        <div ref={driverDetailPanelRef} className='bg-white z-20 fixed bottom-0 w-screen rounded-t-lg'>
            <h5 className={`flex items-center justify-center  ${halfPanelToggle ? 'mt-3' : 'mt-3'}`}><IoIosArrowDown ref={buttonRef} onClick={() => sethalfPanelToggle(prev => !prev)} className='text-gray-700' size={20}/></h5>
            {/* Ride Has Started */}
            <DriverDetailPanel removeUnecessaryThings={removeUnecessaryThings}/>
        </div>
    </div>
  )
}

export default Riding