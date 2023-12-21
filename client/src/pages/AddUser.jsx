import React from 'react'

function AddUser() {
  return (
    
    <div>

<div className='p-5 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold pb-3'>Add User</h1>
        <form  className='text-center flex flex-col gap-3 '>
          <input type="text" placeholder='Enter Username' id='username' className='bg-slate-200  rounded-md text-center p-2'
             />

          <input type="text" placeholder='Enter Email' id='email' className='bg-slate-200 rounded-md text-center p-2'
             />
          <input type="password" placeholder='Password' id='password' className='bg-slate-200 rounded-md text-center p-2'
             />
          <button className='bg-slate-700 p-2 rounded-md text-white hover:bg-slate-800'> Add user</button>
          
          

        </form>
      

      </div>


    </div>
  )
}

export default AddUser