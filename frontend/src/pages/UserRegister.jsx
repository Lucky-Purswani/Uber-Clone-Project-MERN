import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

 function UserRegister() {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {user, setUser} = React.useContext(UserDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = { 
        fullname:{
            firstname,
            lastname
        }
        ,email
        ,password }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/register`, newUser)
    if(response.status === 201){
        const data = response.data;
        localStorage.setItem('token', data.token)
        setUser(data.user)
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
          <h2 className="text-3xl font-bold mb-8 text-center">Create Account as User</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder='Enter your first name'
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder='Enter your last name'
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
                />
              </div>
            </div>

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
                placeholder='Enter your password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg  focus:ring-black "
              />
            </div>

            <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900">
              Create Account
            </button>
          </form>

          <div className="mt-2 space-y-1 text-center">
            <p className="text-gray-600">
              Already have an account? {' '}
              <Link to="/login" className="text-black font-semibold hover:underline">
                Sign in
              </Link>
            </p>
            <p className="text-gray-600">
              Want to drive with Uber? {' '}
              <Link to="/captain-register" className="text-black font-semibold hover:underline">
                Register as Captain
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegister