import React from 'react'
import userSlice from '../../redux/user/userSlice';




function MakeAdmin() {
    const handleAdmin = ()=>{
        console.log('coming here')


    }

  return (
    <div>
         <button className='bg-green-500 text-white px-3 py-1 rounded-md' onClick={handleAdmin}>Make admin</button>
    </div>
  )
}

export default MakeAdmin