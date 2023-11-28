import React from 'react'
import {Link} from 'react-router-dom'
import './Signup.css'

function SignUp() {
  return (
    <>
      <div className='p-5 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold pb-3'>Sign Up</h1>

        <form className='text-center flex flex-col gap-3 '>
          <input type="text" placeholder='Enter Username' id='username' className='bg-slate-200  rounded-md text-center p-2' />

          <input type="text" placeholder='Enter Email' id='email' className='bg-slate-200 rounded-md text-center p-2' />
          <input type="password" placeholder='Password' id='password' className='bg-slate-200 rounded-md text-center p-2' />
          <button className='bg-slate-700 p-2 rounded-md text-white hover:bg-slate-800'> Sign Up</button>

        </form>
        <div className='flex gap-2 mt-2'>
          <p>Have an account?</p>
          <Link to='/signin'>
          <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
      </div>


    </>
  )
}

export default SignUp