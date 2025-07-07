import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div>
        <div className='flex flex-col  justify-between h-screen bg-[url("https://images.unsplash.com/photo-1676748219774-8d53453b30e7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-contain  bg-[position:center_30%]  md:bg-cover  md:bg-[position:center_60%]'>
            <div className='p-4'>
                <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uberLogo" />
            </div>
            <div className='flex flex-col gap-4 bg-white p-4 py-10 rounded-t-md'>
                <h1 className='text-2xl font-bold text-black'>Get started with uber</h1>
                <Link to="/login" className='bg-black text-xl flex justify-center gap-4 items-center font-bold text-white p-3 rounded-lg '>Continue
                    <img className='h-6' src="https://logowik.com/content/uploads/images/svg-right-arrow-icon1716803700.logowik.com.webp" alt="" />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Start