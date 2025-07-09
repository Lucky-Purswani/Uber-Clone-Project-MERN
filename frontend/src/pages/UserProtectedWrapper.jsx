import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

function UserProtectedWrapper({children}) {
    const { user, setUser } = useContext(UserDataContext);
  
  

    // const token = localStorage.getItem('token');
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
        const verifyUser = async () => {
          try {
            const res = await axios.get(`{import.meta.env.VITE_BASE_URL}/users/profile`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("here")
            // console.log(res.data.user);
            if (res.status === 200) {
              setUser(res.data.user);
            }

            if (res.status !== 200) {
              navigate('/login');
            }
          } catch (err) {
            // Invalid token or token of captain
            console.log("Unauthorized user:", err.response?.data || err.message);
            navigate('/login');
          }
  };

  verifyUser();
}, [token]);

    

  return (
    <>
        {children}
    </>
  )
}

export default UserProtectedWrapper