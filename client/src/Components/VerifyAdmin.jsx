import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function VerifyAdmin() {

  const {currentUser} = useSelector(state => state.user)

  return currentUser?.role !== 'Admin' ? <Navigate to='/signin'/> : <Outlet/>
  
  
}

export default VerifyAdmin