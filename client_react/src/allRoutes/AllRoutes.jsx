import React from 'react'

import { GetUser } from '../componets/GetUser'
import { Route,Routes } from 'react-router-dom'
import { CreateUser } from '../componets/CreateUser'

export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path = "/"  element  = {<GetUser/>} />
        <Route path = "/register" element  = {<CreateUser/>} />
      

    </Routes>
    
    </>
  )
}
