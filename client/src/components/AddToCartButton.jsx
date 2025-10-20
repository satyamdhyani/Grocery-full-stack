import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus,FaPlus } from "react-icons/fa";


const AddToCartButton = ({data}) => {

     const { fetchCartItem,updateCartItemQty, deleteCartItem } = useGlobalContext()
     const [loading,setLoading] = useState(false)
     const cartItem = useSelector(state=>state.cartItem.cart)
     const [isAvailableCart,setIsAvailableCart] = useState(false)
     const [qty,setQty] = useState(0)
     const [cartItemDetails,setCartItemDetails] = useState()
 

     /**item is in the cart or not */

     useEffect(()=>{
        const checkingItem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingItem)

        const cart = cartItem.find(item=>item.productId._id === data._id)
        setQty(cart?.quantity)
        setCartItemDetails(cart)

     },[data,cartItem])


     const increaseQty = async(e)=>{
        e.preventDefault()
        e.stopPropagation()

        const response = await updateCartItemQty(cartItemDetails?._id,qty+1)

        if(response.success){
          toast.success("Item added")
        }

     }

     const decreaseQty = async(e)=>{
          e.preventDefault()
          e.stopPropagation()

          if(qty === 1){
            deleteCartItem(cartItemDetails?._id)
            
          } else{

          const response = await updateCartItemQty(cartItemDetails?._id,qty-1)

          if(response.success){
            toast.success("Item remove")
          }
          }

     }


    
    
      const handleAddToCart = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
    
    
        try{
          setLoading(true)
    
          const response = await Axios({
            ...SummaryApi.addTocart,
            data : {
             productId : data?._id
            }
    
          })
    
    
          const {data : responseData} = response
    
          if(responseData.success){
            toast.success(responseData.message)
            if(fetchCartItem){
              fetchCartItem()
            }
          }
          
    
        }catch(error){
         AxiosToastError(error)
        } finally{
          setLoading(false)
        }
    
      }
    



  return (
    <div className='w-full max-w-[150px]'>

        {
            isAvailableCart ? (
                <div className='flex gap-2'>
                     <button onClick={decreaseQty} className='bg-green-500 text-white hover:bg-green-700 flex-1 rounded p-1 flex items-center justify-center'><FaMinus/></button>
                     <p className='font-semibold'>{qty}</p>
                     <button onClick={increaseQty} className='bg-green-500 text-white hover:bg-green-700 flex-1 rounded p-1 flex items-center justify-center'><FaPlus/></button>
                </div>

            ):(
         <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-500 text-white px-2 lg:px-4 py-1 rounded '>
            {loading ? <Loading/> : "Add"}
         </button>
            )
        }
 
      
    </div>
  )
}

export default AddToCartButton
