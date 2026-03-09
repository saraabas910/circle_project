import React from 'react'
import { Outlet } from 'react-router-dom'   

export default function authlayout() {
  return (
    <div>

        <div className='min-h-screen flex justify-center items-center' >
        <div className='border-2 border-grey-500 px-4 py-8 rounded-3xl min-w-100 shadow-2xl'><Outlet/></div>  
        </div>
   

   </div>
  )
}
