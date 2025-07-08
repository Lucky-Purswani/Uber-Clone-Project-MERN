// components/Loader.jsx
import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader
        color="#000000" // Uber-style black spinner
        loading={true}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
