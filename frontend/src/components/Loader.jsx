// components/Loader.jsx
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <TailSpin
        height={50}
        width={50}
        color="#000000" // Black loader to match Uber's theme
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
}
