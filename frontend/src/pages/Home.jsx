import React, { useState, useRef, useEffect, useContext } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FaDotCircle, FaSquare } from "react-icons/fa";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import RideSelectPage from '../components/RideSelectPage';
import RideConfirmationPanel from '../components/RideConfirmationPanel';
import SearchingForVehiclePanel from '../components/SearchingForVehiclePanel';
import DriverDetailPanel from '../components/DriverDetailPanel';
import { UserDataContext } from '../context/UserContext';
import { SocketDataContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import CurrentLocationMap from '../components/CurrentLocationMap';

function Home() {
  const [searchType, setSearchType] = useState('pickup');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const [rideConfirmationPanelOpen, setrideConfirmationPanelOpen] = useState(false);
  const [searchingForVehiclePanelOpen, setsearchingForVehiclePanelOpen] = useState(false);
  const [driverDetailPanelOpen, setdriverDetailPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const buttonRef = useRef(null);
  const rideConfirmationPanelRef = useRef(null);
  const searchingForVehiclePanelRef = useRef(null);
  const driverDetailPanelRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketDataContext);
  

  useEffect(() => {
    socket.emit('joinRoom', { idCheck: user._id, userType: 'user' });
  }, [socket, user]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
  // ride-accepted event (uncomment and use if needed)
  const handleRideAccepted = (data) => {
    // navigate('/riding', { state: { pickupAddress: data.pickup, captainId: data.captainId } });
  };

  const handleOtpVerified = (data) => {
    console.log("Home component data for dest", data);
    navigate('/riding', { state: { pickupAddress: data.pickup, captain: data.captain, destinationAddress: data.destination } });
  };

  const handleAbortRide = (data) => {
    window.location.reload();
    // navigate('/home', { replace: true });
  };

  socket.on('ride-accepted', handleRideAccepted);
  socket.on('otp-verified', handleOtpVerified);
  socket.on('abort-ride', handleAbortRide);

  // Cleanup on unmount
  return () => {
    socket.off('ride-accepted', handleRideAccepted);
    socket.off('otp-verified', handleOtpVerified);
    socket.off('abort-ride', handleAbortRide);
  };
}, [socket, navigate]);

  // Animations for all panels
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '70%' : 0,
      overflow: panelOpen ? 'auto' : 'hidden',
      duration: 0.5,
    });
    gsap.to(buttonRef.current, {
      rotate: panelOpen ? 0 : 180,
      duration: 0.5,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? 'translateY(0%)' : 'translateY(100%)',
      height: vehiclePanelOpen ? 'auto' : 0,
      overflow: vehiclePanelOpen ? 'visible' : 'hidden',
      duration: 0.5,
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(rideConfirmationPanelRef.current, {
      transform: rideConfirmationPanelOpen ? 'translateY(0%)' : 'translateY(100%)',
      height: rideConfirmationPanelOpen ? 'auto' : 0,
      overflow: rideConfirmationPanelOpen ? 'visible' : 'hidden',
      duration: 0.5,
    });
  }, [rideConfirmationPanelOpen]);

  useGSAP(() => {
    gsap.to(searchingForVehiclePanelRef.current, {
      transform: searchingForVehiclePanelOpen ? 'translateY(0%)' : 'translateY(100%)',
      height: searchingForVehiclePanelOpen ? 'auto' : 0,
      overflow: searchingForVehiclePanelOpen ? 'visible' : 'hidden',
      duration: 0.5,
    });
  }, [searchingForVehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(driverDetailPanelRef.current, {
      transform: driverDetailPanelOpen ? 'translateY(0%)' : 'translateY(100%)',
      height: driverDetailPanelOpen ? 'auto' : 0,
      overflow: driverDetailPanelOpen ? 'visible' : 'hidden',
      duration: 0.5,
    });
  }, [driverDetailPanelOpen]);

  const isAnyPanelOpen =
    panelOpen ||
    vehiclePanelOpen ||
    rideConfirmationPanelOpen ||
    searchingForVehiclePanelOpen ||
    driverDetailPanelOpen;

  return (
    <div className='relative h-screen'>
      <div className='absolute top-4 left-4 z-10'>
        <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
      </div>
      <div className="h-screen w-full">
        <CurrentLocationMap />
      </div>

      {/* Dynamic pointer-events on main */}
      <main
        className={`flex flex-col top-0 justify-end h-screen absolute z-10 transition-all duration-300 ${
          isAnyPanelOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="bg-white p-6 w-screen relative h-[30%] pointer-events-auto">
          <h5
            ref={buttonRef}
            onClick={() => setpanelOpen(!panelOpen)}
            className='absolute top-8 right-6 cursor-pointer'
          >
            <IoIosArrowDown size={24} />
          </h5>
          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line w-[2px] h-[44px] bg-gray-700 absolute top-[100px] left-[42px] z-10' />
            <div className="mb-4 flex items-center gap-2">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <FaDotCircle size={14} />
                </span>
                <input
                  type="text"
                  onClick={() => {
                    setpanelOpen(true);
                    setSearchType('pickup');
                  }}
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    setSearchType('pickup');
                    setpanelOpen(true);
                  }}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <FaSquare size={14} />
                </span>
                <input
                  type="text"
                  onClick={() => {
                    setpanelOpen(true);
                    setSearchType('destination');
                  }}
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setSearchType('destination');
                    setpanelOpen(true);
                  }}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
          </form>
        </div>

        <div ref={panelRef} className='bg-white w-screen px-6 overflow-y-auto'>
          <LocationSearchPanel
            setvehiclePanelOpen={setvehiclePanelOpen}
            setpanelOpen={setpanelOpen}
            searchQuery={searchType === 'pickup' ? pickup : destination}
            setPickup={setPickup}
            setDestination={setDestination}
            pickup={pickup}
            destination={destination}
            type={searchType}
          />
        </div>
      </main>

      {/* Panels below */}
      <div ref={vehiclePanelRef} className='bg-white z-30 p-4 fixed bottom-0 w-screen'>
        <RideSelectPage
          setvehiclePanelOpen={setvehiclePanelOpen}
          setrideConfirmationPanelOpen={setrideConfirmationPanelOpen}
          pickup={pickup}
          destination={destination}
        />
      </div>

      <div ref={rideConfirmationPanelRef} className='bg-white z-20 fixed bottom-0 w-screen'>
        <RideConfirmationPanel
          setrideConfirmationPanelOpen={setrideConfirmationPanelOpen}
          setsearchingForVehiclePanelOpen={setsearchingForVehiclePanelOpen}
        />
      </div>

      <div ref={searchingForVehiclePanelRef} className='bg-white z-20 fixed bottom-0 w-screen'>
        <SearchingForVehiclePanel
          setsearchingForVehiclePanelOpen={setsearchingForVehiclePanelOpen}
          setdriverDetailPanelOpen={setdriverDetailPanelOpen}
        />
      </div>

      <div ref={driverDetailPanelRef} className='bg-white z-20 fixed bottom-0 w-screen rounded-t-2xl'>
        <DriverDetailPanel
          setsearchingForVehiclePanelOpen={setsearchingForVehiclePanelOpen}
          setdriverDetailPanelOpen={setdriverDetailPanelOpen}
        />
      </div>
    </div>
  );
}

export default Home;
