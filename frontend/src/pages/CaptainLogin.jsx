import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CaptainLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const checkCaptain = { email, password };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captains/login`, checkCaptain)
    const data = await response.data
    if (response.status === 200) {
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    console.log(data)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <div className='p-4'>
            <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
        </div>

      <div className="my-auto flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Captain Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                placeholder='Enter your email address'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg  focus:ring-black "
              />
            </div>

            <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900">
              Sign In
            </button>
          </form>

          <div className="mt-2 space-y-1 text-center">
            <p className="text-gray-600">
              New Captain? {' '}
              <Link to="/captain-register" className="text-black font-semibold hover:underline">
                Create an account
              </Link>
            </p>
            <p className="text-gray-600">
              Looking to ride? {' '}
              <Link to="/login" className="text-black font-semibold hover:underline">
                Sign in as User
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin