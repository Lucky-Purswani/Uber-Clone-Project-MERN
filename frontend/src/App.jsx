import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import Captainregister from './pages/CaptainRegister'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import RideStarted from './pages/RideStarted'
import { MapProvider } from './context/MapContext'
import UserRidingProtectedWrapper from './pages/UserRidingProtectedWrapper'
import CaptainRidingProtectedWrapper from './pages/CaptainRidingProtectedWrapper'

function App() {
  return (
    <MapProvider>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />

        <Route path="/riding" element={
          <UserRidingProtectedWrapper>
            <Riding />
          </UserRidingProtectedWrapper>
        }/>

        <Route path="/register" element={<UserRegister />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-register" element={<Captainregister />} />

        <Route path="/ride-started" element={
          <CaptainRidingProtectedWrapper>
            <RideStarted />
          </CaptainRidingProtectedWrapper>
        }/>

        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
          } />

        <Route path="/captain-home" element={
           <CaptainProtectedWrapper>
           <CaptainHome/>
          </CaptainProtectedWrapper>
          } />

        <Route path="/logout" element={
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>
          } />

        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout/>
          </CaptainProtectedWrapper>
          }
        />

      </Routes>
    </MapProvider>
  )
}

export default App