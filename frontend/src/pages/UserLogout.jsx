import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function UserLogout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)

    const logoutUser = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
            if (res.status === 200) {
              localStorage.removeItem('token')
              navigate('/login')
            }
        })

      } catch (err) {
        console.error("Logout failed:", err)
        // navigate('/login') // Redirect even if error
      }
    };

    logoutUser();
  }, [navigate]); // use navigate as a dependency

  return (
    <div>Logging you out...</div>
  )
}

export default UserLogout
