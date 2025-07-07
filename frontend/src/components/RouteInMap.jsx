import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { MapContext } from '../context/MapContext';
import PulseLoader from 'react-spinners/PulseLoader';
import Loader from './Loader';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Uber-like map style (grayscale/dark)
const uberMapStyle = [
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "gamma": 0.5 }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "lightness": 100 },
      { "visibility": "simplified" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#2D333C" }
    ]
  }
];

// Custom icons
const vehicleIcon = {
  url: "https://static.vecteezy.com/system/resources/previews/029/947/412/non_2x/white-city-car-isolated-on-transparent-background-3d-rendering-illustration-free-png.png", // Example vehicle icon, replace with your own if needed
  scaledSize: { width: 40, height: 40 }
};
const userIcon = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7uACgyiKt5pU7HEX5okhp4ZzkdHO0mjlHXw&s", // Example vehicle icon, replace with your own if needed
  scaledSize: { width: 20, height: 20 }
};

function RouteInMap() {
  const { pickupMap , captainLocationMap, destinationMap } = useContext(MapContext);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API
  });

  useEffect(() => {
    if (isLoaded && captainLocationMap && destinationMap) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: captainLocationMap,
          destination: destinationMap,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === 'OK') {
            
            setDirections(result);
          }
        }
      );
    }
  }, [isLoaded, captainLocationMap, destinationMap]);

  // Custom DirectionsRenderer with black polyline
  const directionsOptions = {
    polylineOptions: {
      strokeColor: "#111",
      strokeWeight: 5
    }
  };

  if (!isLoaded) return <Loader/>;
  if (!destinationMap) return <Loader/>;
  if (!captainLocationMap) return <Loader/>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={captainLocationMap}
      zoom={15}
      options={{
        styles: uberMapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        clickableIcons: false,
      }}
    >
      {/* Captain marker with vehicle image */}
      <Marker position={captainLocationMap} icon={vehicleIcon} />
      {/* User marker as black circle */}
      <Marker position={destinationMap} icon={userIcon} />
      {/* Black route */}
      {directions && (
      <DirectionsRenderer 
        directions={directions} 
        options={{
          ...directionsOptions,
          suppressMarkers: true
        }} 
      />
)}
    </GoogleMap>
  );
}

export default RouteInMap;