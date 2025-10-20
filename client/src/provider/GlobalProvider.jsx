import {createContext,useContext, useEffect, useState} from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddItemCart } from '../store/cartProduct'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { CalculateDiscount } from '../utils/CalculateDiscount'
import { handleAddAddress } from '../store/addressSlice'
import {setOrder} from '../store/orderSlice'


export const GlobalContext = createContext(null)
export const  useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children}) =>{
    const dispatch = useDispatch()
    const [totalPrice ,setTotalPrice] = useState(0)
    const [notDiscountPrice,setNotDiscountPrice] = useState(0)
    const [totalQuantity,setTotalQuantity] = useState(0)
     const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state?.user)

    const fetchCartItem = async()=>{
    try{
      const response = await Axios({
        ...SummaryApi.getCartItem
      })

      const {data : responseData} = response

      if(responseData.success){
        dispatch(handleAddItemCart(responseData.data))

      }

    }catch(error){

    }
  }

  const updateCartItemQty = async(id,qty)=>{
    try{
      
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data : {
          _id : id,
          quantity : qty

        }
      })

      const {data : responseData} = response
      if(responseData.success){
        // toast.success(responseData.message)
        fetchCartItem()
         return responseData
      }

     

    }catch(error){
      AxiosToastError(error)
      return error
    }
  }

  const deleteCartItem = async(cardId)=>{
    try{
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data : {
          _id : cardId
        }
      })

      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchCartItem()
      }


    } catch(error){
      AxiosToastError(error)
    }
  }




   useEffect(()=>{
      const qty = cartItem.reduce((preve,curr)=>{
           return preve + curr.quantity
      },0)
  
      setTotalQuantity(qty)
  
      
  
      const totalPrice = cartItem.reduce((preve,curr)=>{
        return preve + (CalculateDiscount(curr?.productId?.price,curr?.productId?.discount) * curr.quantity)
      },0)
  
      setTotalPrice(totalPrice)



      const notDiscountPrice = cartItem.reduce((preve,curr)=>{

        return preve + (curr?.productId?.price * curr?.quantity)
      },0)
      setNotDiscountPrice(notDiscountPrice)
  
    },[cartItem])


 


  const handleLogoutForCartItemDisplay = ()=>{
    localStorage.clear()
    dispatch(handleAddItemCart([]))
  }


  const fetchAddress = async()=>{
    try{
      const response = await Axios({
        ...SummaryApi.getAddress
      })

      const {data : responseData} = response
      

      if(responseData.success){
        dispatch(handleAddAddress(responseData.data))
       
      }

    }catch(error){
      AxiosToastError(error)

    }
  }



  const fetchOrder = async()=>{
    try{
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      })

      const {data : responseData} = response

      if(responseData.success){
        dispatch(setOrder(responseData.data))
      }

    }catch(error){
      AxiosToastError(error)
    }
  }



   useEffect(()=>{
    fetchCartItem()
    handleLogoutForCartItemDisplay()
    fetchAddress()
    fetchOrder()

  },[user])

  

    return(
        <GlobalContext.Provider value={{
          fetchCartItem,
          updateCartItemQty,
          deleteCartItem,
          fetchAddress,
          totalPrice,
          totalQuantity,
          notDiscountPrice,
          fetchOrder
          
          
          }}>
            {children}

        </GlobalContext.Provider>


    )
}

export default GlobalProvider
