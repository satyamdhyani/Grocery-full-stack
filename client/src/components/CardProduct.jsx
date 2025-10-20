import React, { useState } from 'react'
import { DisplayPriceInRupee } from '../utils/DisplayPriceInRupee'
import { Link } from 'react-router-dom'
import { validateUrl } from '../utils/validateUrl'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
  const url = `/product/${validateUrl(data.name)}-${data._id}`
 
 

 

  





  





  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white '>
       <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
        <img
        src={data.image[0]}
        className='w-full h-full object-scale-down object-scale-down lg:scale-125'
        
        />

       </div>

       <div className='rounded text-xs px-2 w-fit flex items-center gap-2'>
          <p className='bg-green-300 rounded-full text-white-200 w-12 p-1'>10 min</p>


        <div className='bg-white my-2'>
           {
          data.discount !== 0 ? (
            <p className='text-green-400 lg:text-lg'>{data.discount}% <span className='text-sm text-neutral-500'>Discount</span></p>

          ) : (
            <p></p>
          )
        
        
        }
        </div>


       </div>

        <div className='px-1 lg:px-0 font-medium text-ellipsis text-sm lg:text-base ellipsis line-clamp-2'>
          {data.name}

       </div>
        <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
          {data.unit}
           

       </div>


       <div className=' px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='font-semibold'>
         {DisplayPriceInRupee(data.price)}

     
         
          
  
        </div>
        <div className=''>
          {
            data.stock == 0 ? (
              <p className=' text-sm lg:text-md text-red-500 text-center'>Out of stock</p>
            ):(
                <AddToCartButton data={data}/>

            )
          }

        </div>

       </div>
      
    </Link>
  )
}

export default CardProduct
