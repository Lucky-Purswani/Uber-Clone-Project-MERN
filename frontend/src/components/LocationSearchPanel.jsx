import { IoLocationSharp } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RideDataContext } from "../context/RideContext";

function LocationSearchPanel({pickup, destination, setvehiclePanelOpen, setpanelOpen, searchQuery, setPickup, setDestination, type }) {
    const [suggestions, setSuggestions] = useState([]);
    const [pickupBool, setpickupBool] = useState(false);
    const [destinationBool, setdestinationBool] = useState(false);
    const { setRide, ride, updatePickupAndDestination} = React.useContext(RideDataContext);

    const getVehicleRideInfo = async (pickup, destination) => {
        try {
            const res = await axios.get(
              `{import.meta.env.VITE_BASE_URL}/ride/fare-distance-duration`,
              {
                params:{
                    pickup,
                    destination
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                },
              }
            );
            const { distance, duration, fareObj} = res.data
            setRide(prev => ({
                ...prev,
                pickup,
                destination,
                distance,
                duration,
                fare: fareObj,
            }))
            
    
        } catch (error) {
          console.error("Error fetching ride info:", error);
        }
      };

    useEffect(() => {
        if (!searchQuery || searchQuery.trim() === "") {
            setSuggestions([]);
            return;
        }
        const fetchSuggestions = async () => {
            try {
                const res = await axios.get(
                    `{import.meta.env.VITE_BASE_URL}/map/suggestions`,
                    { params: { address: searchQuery }, 
                      headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }
                    }
                );
                const descriptions = res.data.map(item => item.description);
                setSuggestions(descriptions || []);
                if(type === "pickup") setpickupBool(true);
                else setdestinationBool(true);
            } catch (err) {
                setSuggestions([]);
            }
        };
        fetchSuggestions();
        
        
    }, [searchQuery]);
    
    const canConfirm = pickupBool && destinationBool;


    return (
        <div className='flex flex-col relative'>
            {canConfirm && (
                <button
                    className=" bg-gray-900 text-white mb-5 py-2 px-4 rounded sticky top-0 shadow hover:bg-gray-950 transition"
                    onClick={() => {
                        getVehicleRideInfo(pickup, destination);
                        setpanelOpen(prev => !prev);
                        setvehiclePanelOpen(prev => !prev);
                        (async () => {
                            await getVehicleRideInfo(pickup, destination);
                        })();
                    }}
                >
                    Find Ride
                </button>
            )}


            <div className="overflow-y-auto">
            {suggestions.length === 0 && (
                <div className="text-gray-400 text-center py-2">No suggestions</div>
            )}
            {suggestions.map((location, idx) => (
                <div
                    onClick={() => {
                        if (type === "pickup") setPickup(location);
                        else setDestination(location);
                        
                        // setpanelOpen(prev => !prev);
                    }}
                    className='flex gap-3 items-center active:border-gray-400 mb-3 rounded-lg py-1 cursor-pointer overflow-y-auto'
                    key={idx}
                >
                    <h5 className='bg-gray-200 p-2 rounded-full'><IoLocationSharp size={18} /></h5>
                    <p className='text-black font-medium'>{location}</p>
                </div>
            ))}
        </div>
            

        </div>
    );
}

export default LocationSearchPanel