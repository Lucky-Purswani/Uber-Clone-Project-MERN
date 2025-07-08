import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

function CaptainRegister() {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicle, setVehicle] = useState({
    color: '',
    plate: '',
    capacity: '',
    vehicleType: ''
  })

  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const handleSubmit = async(e) => {
    e.preventDefault()
    const newCaptain = { 
      fullname: {
        firstname,
        lastname
      },
      email,
      password,
      status: 'inactive',
      vehicle:{
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captains/register`, newCaptain)
    if(response.status === 201){
      const data = response.data
      localStorage.setItem('token', data.token)
      setCaptain(data.captain)
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen flex flex-col pb-4 bg-gray-100">
      <div className='p-4'>
        <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
      </div>

      <div className="my-auto flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold my-8 text-center">Become a Captain</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  placeholder='Enter your first name'
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  placeholder='Enter your last name'
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                placeholder='Enter your email address'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                placeholder='Enter your password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Color</label>
                <input
                  placeholder='e.g. White'
                  type="text"
                  value={vehicle.color}
                  onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label>
                <input
                  placeholder='e.g. AB12 XYZ'
                  type="text"
                  value={vehicle.plate}
                  onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  placeholder='e.g. 4'
                  type="number"
                  min="1"
                  value={vehicle.capacity}
                  onChange={(e) => setVehicle({ ...vehicle, capacity: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <select
                  value={vehicle.vehicleType}
                  onChange={(e) => setVehicle({ ...vehicle, vehicleType: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black bg-white"
                >
                  <option value="">Select type</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900">
              Create Account
            </button>
          </form>

          <div className="mt-2 space-y-1 text-center">
            <p className="text-gray-600">
              Already a captain?{' '}
              <Link to="/captain-login" className="text-black font-semibold hover:underline">
                Sign in
              </Link>
            </p>
            <p className="text-gray-600">
              Looking to ride?{' '}
              <Link to="/register" className="text-black font-semibold hover:underline">
                Register as User
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainRegister