import { createContext, useState } from "react";

export const MapContext = createContext();

export function MapProvider({ children }) {
  const [pickupMap, setPickupMap] = useState(null);         // { lat, lng }
  const [destinationMap, setDestinationMap] = useState(null); // { lat, lng }
  const [captainLocationMap, setCaptainLocationMap] = useState(null); // { lat, lng }

  return (
    <MapContext.Provider value={{
      pickupMap, setPickupMap,
      destinationMap, setDestinationMap,
      captainLocationMap, setCaptainLocationMap
    }}>
      {children}
    </MapContext.Provider>
  );
}