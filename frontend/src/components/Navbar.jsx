import React from 'react'
import { SlWallet } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import Logo from "./Logo"

const Navbar = () => {
  return (
    <div className='flex justify-between px-4 sm:px-8 md:px-12 py-6 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-100 shadow-md'>
      <Logo/>
      <div className='flex items-center gap-3 sm:gap-6 text-base sm:text-lg'>
        <Link to="/login"><button className='cursor-pointer text-sky-900 hover:underline'>Log in</button></Link>
        <Link to="/signup"><button className='cursor-pointer bg-sky-500 rounded-lg px-4 py-2 text-white hover:bg-sky-600 shadow transition'>Sign up</button></Link>
      </div>
    </div>
  )
}

export default Navbar
