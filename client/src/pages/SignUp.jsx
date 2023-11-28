import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

function SignUp() {

  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success == false) {
        setError(true)
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true)
      console.log(error)
    }



  }
  return (
    <>
      <div className='p-5 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold pb-3'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='text-center flex flex-col gap-3 '>
          <input type="text" placeholder='Enter Username' id='username' className='bg-slate-200  rounded-md text-center p-2'
            onChange={handleChange} />

          <input type="text" placeholder='Enter Email' id='email' className='bg-slate-200 rounded-md text-center p-2'
            onChange={handleChange} />
          <input type="password" placeholder='Password' id='password' className='bg-slate-200 rounded-md text-center p-2'
            onChange={handleChange} />
          <button className='bg-slate-700 p-2 rounded-md text-white hover:bg-slate-800'> {loading ? 'Loading' : 'Sign up'}</button>

        </form>
        <div className='flex gap-2 mt-2'>
          <p>Have an account?</p>
          <Link to='/signin'>
            <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
        <p className='text-red-500'>{error && "Something went wrong!"}</p>
      </div>


    </>
  )
}

export default SignUp