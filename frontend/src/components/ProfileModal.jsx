import React from 'react'
import { Link } from 'react-router-dom'

const ProfileModal = () => {
  return (
    <>
      <div className='bg-sky-50 flex flex-col rounded-lg absolute mt-2 gap-1 px-3 py-1 items-start border border-sky-50 hover:border-teal-600 hover:shadow-2xl transition-all'>
        <Link to="/dashboard" className='md:hidden font-semibold hover:text-cyan-900'>Dashboard</Link>
        <Link to="/profile" className='font-semibold hover:text-cyan-900'>Profile</Link>
        <Link to="/groups" className='font-semibold hover:text-cyan-900 hover:font-bold'>My Groups</Link>
        <button className='font-semibold text-red-500 cursor-pointer'>Log Out</button>
      </div>
    </>
  )
}

export default ProfileModal
