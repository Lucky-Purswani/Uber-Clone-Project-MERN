import React from 'react'
import { useState } from 'react'

export const CaptainDataContext = React.createContext();
function CaptainContext({children}) {
    const [captain, setCaptain] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: '', 
        vehicle:{
            color: '',
            plate: '',
            capacity: '',
            vehicleType: ''
        }
    });
    const captainData = {captain, setCaptain};

    return (
        <>
            <CaptainDataContext.Provider value={{captain, setCaptain}}>
                {children}
            </CaptainDataContext.Provider>
        </>
    )
}

export default CaptainContext