import React from 'react'
import {useSelector } from 'react-redux'
function Profile() {

  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <img className='h-25 w-25 self-center rounded-full object-cover' src={currentUser.profilePicture} alt="profile" />

      <input type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.username}/>
      <input type="text" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.email}/>
      <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' />

    <button className=' bg-slate-600 text-white p-2 rounded-xl uppercase hover:bg-slate-700'>update</button>
      </form>
      <div className='flex justify-between'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile