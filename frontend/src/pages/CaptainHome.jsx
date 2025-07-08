import { useState, useRef } from 'react';
import CaptainHomeDetailPanel from '../components/CaptainHomeDetailPanel'
import {useGSAP } from '@gsap/react'
import { IoIosArrowDown } from "react-icons/io";
import gsap from 'gsap';
import NewRidePopUpPanel from '../components/NewRidePopUpPanel';
import AcceptedRideUserDetailPanel from '../components/AcceptedRideUserDetailPanel';
import { useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketDataContext } from '../context/SocketContext';
import axios from 'axios';
import CurrentLocationMap from '../components/CurrentLocationMap';
import { MapContext } from '../context/MapContext';
import RouteInMap from '../components/RouteInMap';
import PickupRouteMap from '../components/PickupRouteMap';


function CaptainHome() {

  const rideAcceptIgnorePanelRef = useRef(null)
  const acceptedRideDetailPanelRef= useRef(null)
  const [rideOnCaptainSide, setrideOnCaptainSide] = useState({})
  const [acceptedRideUserDetailPanelOpen, setacceptedRideUserDetailPanelOpen] = useState(false)
  const [rideAcceptIgnorePanelOpen, setrideAcceptIgnorePanelOpen] = useState(false)
  const [online, setonline] = useState("")
  const { socket } = useContext(SocketDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const { setCaptainLocationMap, setPickupMap } = useContext(MapContext);
  const [captainStatus, setCaptainStatus] = useState(captain?.status || 'inactive');
  const [section, setsection] = useState(true)
  const [pickupForRoute, setpickupForRoute] = useState("")
  const arrorRef = useRef(null);
  const captainHomeDetailPanelRef = useRef(null)
  const mapRef = useRef(null)


  const toggleStatus = async () => {
    const newStatus = captainStatus === 'active' ? 'inactive' : 'active';
    try {
      await axios.patch(`${import.meta.env.VITE_BASE_URL}captains/status`, 
        { status: newStatus },
        {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
      )
      socket.emit('captain-status-change', { captainId: captain._id, status: newStatus });
      setCaptainStatus(newStatus);
      setonline(newStatus === 'active');
      setCaptain({ ...captain, status: newStatus });
    } catch (error) {
      console.log('Error toggling status:', error);
    }
  };
  
  useEffect(() => {
      // console.log("CaptainProtectedWrapper useeffect for the socket");
      socket.emit('joinRoom', { idCheck: captain._id, userType: 'captain' });
      // console.log(captain)

      const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log('Coords for captain:', position);
          setCaptainLocationMap({ lat: position.coords.latitude, lng: position.coords.longitude });
          socket.emit('update-location-captain', {
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
      };

      const locationInterval = setInterval(updateLocation, 10000);
      updateLocation();
      return () => clearInterval(locationInterval);
  }, [captain._id, socket]);

  socket.on('ride-request', (data) => {
    console.log('ride-request this data', data);
    setpickupForRoute(data.pickup);
    setrideOnCaptainSide(data);
    setrideAcceptIgnorePanelOpen(true);
  });

  const acceptRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}rides/accept`, 
      {
        rideId: rideOnCaptainSide._id,
        
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        
      }
    );
  }

  useGSAP(() => {
  if (rideAcceptIgnorePanelOpen) {
    gsap.to(rideAcceptIgnorePanelRef.current, {
      transform: 'translateY(0%)',
      height: 'auto',
      overflow: 'visible',
      duration: 0.5,
    });
  } else {
    gsap.to(rideAcceptIgnorePanelRef.current, {
      transform: 'translateY(100%)',
      height: 0,
      overflow: 'hidden',
      duration: 0.5,
    });
  }
}, [rideAcceptIgnorePanelOpen]);


  useGSAP(() => {
  if (acceptedRideUserDetailPanelOpen) {
    gsap.to(acceptedRideDetailPanelRef.current, {
      transform: 'translateY(0%)',
      height: '100%',
      overflow: 'auto',
      duration: 0.5,
    });
  } else {
    gsap.to(acceptedRideDetailPanelRef.current, {
      transform: 'translateY(100%)',
      height: 0,
      overflow: 'hidden',
      duration: 0.5,
    });
  }
}, [acceptedRideUserDetailPanelOpen]);

  useGSAP(() => {
    if(!section && acceptedRideUserDetailPanelOpen){ 
      gsap.to(arrorRef.current, {
        duration: 0.5,
        rotation: 180
      });
      gsap.to(acceptedRideDetailPanelRef.current, {
        duration: 0.5,
        height: '120px', 
        overflow: 'hidden'
      });
      gsap.to(captainHomeDetailPanelRef.current, {
        opacity: 0,
        height: '17%'
      })
      gsap.to(mapRef.current, {
        duration: 0.5,
        height: '83%'
      })
    }
    else if(acceptedRideUserDetailPanelOpen){
      gsap.to(arrorRef.current, {
        duration: 0.5,
        rotation: 0
      });
      gsap.to(acceptedRideDetailPanelRef.current, {
        duration: 0.5,
        height: '100%',
        overflow: 'auto'
      });
      gsap.to(captainHomeDetailPanelRef.current, {
        opacity: 1,
        height: '33.4%'
      })
      gsap.to(mapRef.current, {
        duration: 0.5,
        height: '66.6%'
      })
    }
  }, [section]);


  return (
    <div className='h-screen '>
        {/* Header  */}
        <div className="flex flex-col z-20 gap-3 absolute w-full top-0 items-center justify-between py-3 bg-white border-b">
          <div className='flex items-center justify-between px-4 w-full'>
            <img className='h-4' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
            <div className="font-semibold text-base text-black">{online ? 'Online' : 'Offline'}</div>
            <label className="inline-flex items-center cursor-pointer relative">
              <input type="checkbox" checked={online} onChange={toggleStatus} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-gray-500 transition-all"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>
          <div className='line w-full h-[1px] bg-gray-200'/>
          {/* Offline Alert */}
          <div
            key={online ? 'online' : 'offline'} // to re-trigger animation
            className={`text-black px-4 flex items-center gap-2 w-full transition-all duration-300 transform ${
              online ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
            } animate-fadeIn`}
          >
            <span className="font-semibold">You are {online ? 'online' : 'offline'}!</span>
            <span className="text-sm">
              Go {online ? 'offline' : 'online'} to {online ? 'stop' : 'start'} accepting rides.
            </span>
          </div>
        </div>


        <div className='h-4/6' ref={mapRef}>
            {/* <img
                className="h-full w-full object-cover"
                src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                alt="img"
            /> */}
            {
              acceptedRideUserDetailPanelOpen ? <PickupRouteMap pickupForRoute={pickupForRoute}/> : <CurrentLocationMap/>
            }
        </div>
        <div className='h-2/6' ref={captainHomeDetailPanelRef}>
          <CaptainHomeDetailPanel setCaptainStatus={setCaptainStatus} captainStatus={captainStatus} captain={captain} setonline={setonline}/>
        </div>
        <div ref={rideAcceptIgnorePanelRef} className='bg-white z-20 fixed bottom-0 overflow-y-auto w-screen'>
          <NewRidePopUpPanel acceptRide = {acceptRide} rideOnCaptainSide={rideOnCaptainSide} setrideAcceptIgnorePanelOpen={setrideAcceptIgnorePanelOpen} setacceptedRideUserDetailPanelOpen={setacceptedRideUserDetailPanelOpen}/>
        </div>
        <div ref={acceptedRideDetailPanelRef}  className='bg-white h-screen z-20 fixed bottom-0 overflow-y-auto w-screen'>
          <h4 
            onClick={() => setsection(!section)}
            ref={arrorRef}
            className='flex items-center justify-center px-4 mt-2'>
            <IoIosArrowDown size={24} />
          </h4>
          <AcceptedRideUserDetailPanel rideOnCaptainSide={rideOnCaptainSide} acceptedRideUserDetailPanelOpen={acceptedRideUserDetailPanelOpen} setacceptedRideUserDetailPanelOpen={setacceptedRideUserDetailPanelOpen}/>
        </div>
    </div>
  )
}

export default CaptainHome