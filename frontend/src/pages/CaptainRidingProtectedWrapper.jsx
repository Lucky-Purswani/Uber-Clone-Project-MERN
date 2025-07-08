import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { RideDataContext } from '../context/RideContext';

function CaptainRidingProtectedWrapper({ children }) {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const { ride } = useContext(RideDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyCaptain = async () => {
      if (!token) {
        navigate('/captain-login');
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}captains/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
          setCaptain(res.data.captain);
          // Check ride ownership
          if (ride && ride.captain && ride.captain._id !== res.data.captain._id) {
            navigate('/captain-home', { replace: true });
            }
        } else {
          navigate('/captain-login');
        }
      } catch (err) {
        navigate('/captain-login');
      }
    };
    verifyCaptain();
  }, [token, ride, setCaptain, navigate]);

  return <>{children}</>;
}

export default CaptainRidingProtectedWrapper;