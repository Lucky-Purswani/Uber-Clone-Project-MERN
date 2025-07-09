import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import Loader from './Loader';

const containerStyle = {
  width: '100%',
  height: '100%'
};

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

// Icons (same as RouteInMap)
const vehicleIcon = {
  url: "https://static.vecteezy.com/system/resources/previews/029/947/412/non_2x/white-city-car-isolated-on-transparent-background-3d-rendering-illustration-free-png.png",
  scaledSize: { width: 40, height: 40 }
};
const userIcon = {
  url: "https://static.vecteezy.com/system/resources/previews/024/677/981/non_2x/3d-icon-of-men-profil-people-free-png.png",
  scaledSize: { width: 40, height: 40 }
};

function PickupRouteMap({ pickupForRoute }) {
  const [captainLocation, setCaptainLocation] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API
  });

  // Get captain's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCaptainLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      });
    }
  }, []);

  // Get pickup coordinates from API
  useEffect(() => {
    if (pickupForRoute) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}//map/coordinates`, {
          params: { address: pickupForRoute },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setPickupCoords({ lat: res.data.ltd, lng: res.data.lng });
        })
        .catch((err) => {
          console.error('Failed to fetch pickup coordinates', err);
        });
    }
  }, [pickupForRoute]);

  // Get directions between captain and pickup
  useEffect(() => {
    if (isLoaded && captainLocation && pickupCoords) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: captainLocation,
          destination: pickupCoords,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          }
        }
      );
    }
  }, [isLoaded, captainLocation, pickupCoords]);

  const directionsOptions = {
    polylineOptions: {
      strokeColor: "#111",
      strokeWeight: 5
    },
    suppressMarkers: true
  };

  if (!isLoaded) return <Loader/>;
  if (!captainLocation || !pickupCoords) return <Loader/>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={captainLocation}
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
      {/* Captain marker with vehicle icon */}
      <Marker position={captainLocation} icon={vehicleIcon} />
      {/* Pickup marker with user icon */}
      <Marker position={pickupCoords} icon={userIcon} />
      {/* Black route */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={directionsOptions}
        />
      )}
    </GoogleMap>
  );
}

export default PickupRouteMap;