import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSucces, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSucces(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }

  return (
    <div>
      <div className='p-5 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold pb-3'>Sign In</h1>
        <form onSubmit={handleSubmit} className='text-center flex flex-col gap-3 '>

          <input onChange={handleChange} type="text" placeholder='Enter Email' id='email' className='bg-slate-200 rounded-md text-center p-2'
          />
          <input onChange={handleChange} type="password" placeholder='Password' id='password' className='bg-slate-200 rounded-md text-center p-2'
          />
          <button className='bg-slate-700 p-2 rounded-md text-white hover:bg-slate-800'>{loading ? 'Loading' : 'Sign In'}</button>

        </form>
        <div className='flex gap-2 mt-2'>
          <p>Don't have an account?</p>
          <Link to='/signup'>
            <span className='text-blue-500'>Sign Up</span>
          </Link>
        </div>
        <p className='text-red-500'>
          {error ? error.message  || 'Something went wrong!' : ''}
          </p>
      </div>
    </div>
  )
}

export default SignIn