import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()

    console.log( "location success",location?.state?.text)





  return (
    <div className='m-3 w-full max-w-md bg-green-200 p-4 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-green-800 font-bold text-lg text-center'>{location?.state?.text ? location.state.text : "Payment"} Successfully </p>
        <Link to='/' className='border border-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1 '>Go To Home</Link>
        
      
    </div>
  )
}

export default Success
