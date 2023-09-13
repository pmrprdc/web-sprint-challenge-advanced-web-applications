import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
const PrivateRoutes = () => {
    
    const token = localStorage.getItem('token')
return (
    token ? <Outlet/> : <Navigate to='/'/>
  )
}



export default PrivateRoutes;