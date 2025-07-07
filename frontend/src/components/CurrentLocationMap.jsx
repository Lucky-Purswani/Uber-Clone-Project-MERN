import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Loader from './Loader';

const containerStyle = {
  width: '100%',
  height: '100%'
};

function CurrentLocationMap() {
  const [location, setLocation] = useState(null);
  


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API
  });

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

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      console.log('Coords in Edge:', coords);
      setLocation(coords);
    }, err => {
      console.error('Geolocation error:', err);
    });
  }
}, []);

  if (!isLoaded) return <Loader/>;
  if (!location) return <Loader/>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
      options={{
        styles: uberMapStyle,
        mapTypeControl: false,      // Hides Map/Satellite toggle
        streetViewControl: false,   // Hides Street View
        fullscreenControl: false,   // Hides Fullscreen button
        zoomControl: false,         // Hides Zoom buttons
        clickableIcons: false,      // Disables POI icons
      }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
}

export default CurrentLocationMap;