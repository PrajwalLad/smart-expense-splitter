import React from 'react'
import { SlWallet } from 'react-icons/sl'

const Navbar = () => {
  return (
    <div className='flex justify-between px-15 py-6 bg-gradient-to-r from-sky-100 via-sky-300 to-sky-100 shadow-md'>
      <div className='logo cursor-pointer flex gap-1 items-center text-sky-900 font-bold text-2xl tracking-wide'><SlWallet className='size-10'/><span>Splitter</span></div>
      <div className='flex items-center gap-10 text-lg '>
        <button className='cursor-pointer text-sky-900 hover:underline'>Log in</button>
        <button className='cursor-pointer bg-sky-500 rounded-lg px-4 py-2 text-white hover:bg-sky-600 shadow transition'>Sign up</button>
      </div>
    </div>
  )
}

export default Navbar
