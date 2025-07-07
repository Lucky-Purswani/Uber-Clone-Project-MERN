import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext';
import { useContext } from 'react';

function CaptainProtectedWrapper({children}) {
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const token = localStorage.getItem('token');
    const navigate = useNavigate()



    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
        const verifyCaptain = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 200) {
                    setCaptain(res.data.captain);
                }

                if (res.status !== 200) {
                    navigate('/captain-login');
                }

                
            } catch (err) {
                console.log("Unauthorized user:", err.response?.data || err.message);
                navigate('/captain-login');
            }
            
        }
        verifyCaptain();
    } , [token])

  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedWrapper