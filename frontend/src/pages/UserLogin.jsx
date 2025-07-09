import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'


function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userCheck = { email, password }
    const response = await axios.post(`{import.meta.env.VITE_BASE_URL}/users/login`, userCheck)
    const token = await response.data.token
    if(response.status === 200){
      setUser(response.data.user)
      localStorage.setItem('token', token)
      navigate('/home')
    } 
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className='p-4'>
            <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
        </div>

      <div className="my-auto flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Welcome Back, Login as User</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg  focus:ring-black "
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black"
              />
            </div>

            <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900">
              Sign In
            </button>
          </form>

          <div className="mt-2 space-y-1 text-center">
            <p className="text-gray-600">
              New to Uber? {' '}
              <Link to="/register" className="text-black font-semibold hover:underline">
                Create an account
              </Link>
            </p>
            <p className="text-gray-600">
              Are you a captain? {' '}
              <Link to="/captain-login" className="text-black font-semibold hover:underline">
                Login as Captain
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin