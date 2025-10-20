import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupee } from '../utils/DisplayPriceInRupee'
import { Link } from 'react-router-dom'
import { FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'





const CartMobile = () => {

const {  totalPrice,totalQuantity} = useGlobalContext()
const cartItem = useSelector(state=>state.cartItem.cart)


  return (
    <>
       {
        cartItem[0] && (
                  <div className='bg-green-700 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between lg:hidden'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-green-500 rounded fit'>
                  <FaShoppingCart/>
        
                </div>
                <div className='text-xs'>
                  <p>{totalQuantity} items</p>
                  <p>{DisplayPriceInRupee(totalPrice)}</p>
                </div>
        
              </div>
        
              <Link to={"/cart"} className='flex items-center gap-1'>
                <span className='text-sm'>View Cart</span>
                <FaCircleChevronRight/>
              </Link>
        
            </div>
      
        )
       }
    
    </>
   
     

  )
}

export default CartMobile
