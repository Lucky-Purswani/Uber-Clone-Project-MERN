import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { RideDataContext } from '../context/RideContext';

function UserRidingProtectedWrapper({ children }) {
  const { user, setUser } = useContext(UserDataContext);
  const { ride } = useContext(RideDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get(`{import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
          setUser(res.data.user);
          // Check ride ownership
          if (!ride || !ride.user || ride.user._id !== res.data.user._id) {
            navigate('/home', { replace: true });
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        navigate('/login');
      }
    };
    verifyUser();
  }, [token, ride, setUser, navigate]);

  return <>{children}</>;
}

export default UserRidingProtectedWrapper;