import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
     <div className='m-3 w-full max-w-md bg-red-200 p-4 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-red-800 font-bold text-lg text-center'> Order Cancel </p>
        <Link to='/' className='border border-red-800 hover:bg-red-900 hover:text-white transition-all px-4 py-1 '>Go To Home</Link>
        
      
    </div>
  )
}

export default Cancel
