import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'
import './index.css'
import App from './App.jsx'
import { RideContext } from './context/RideContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RideContext>
      <CaptainContext>
        <UserContext>
          <SocketProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SocketProvider>
        </UserContext>
      </CaptainContext>
    </RideContext>
  </StrictMode>,
)
