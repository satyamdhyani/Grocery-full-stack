import React, { useState } from 'react'
import { DisplayPriceInRupee } from '../utils/DisplayPriceInRupee'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {
 const {notDiscountPrice,totalPrice, totalQuantity,fetchCartItem,fetchOrder} = useGlobalContext()
 const [openAddress,setOpenAddress] = useState(false)
 const addressList = useSelector(state=>state.addresses.addressList)
 const [selectedAddress,setSelectedAddress] = useState(0)
 const cartItemsList = useSelector(state=>state.cartItem.cart)
 const navigate = useNavigate()




 console.log("addresslist",addressList)


 const handleCashOnDelivery = async()=>{
    try{
      const response = await Axios({
        ...SummaryApi.cashOnDeliveryOrder,
        data : {
          list_items : cartItemsList,
          
          totalAmt :  totalPrice,
          addressId :  addressList[selectedAddress]?._id,
          subTotalAmt : totalPrice
        }
      })


      const {data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        if(fetchCartItem){
          fetchCartItem()
        }
        if(fetchOrder){
          fetchOrder()
        }
        navigate('/success',{
          state : {
            text : "Order"
          }
        })


        
      }

    }catch(error){
      AxiosToastError(error)
    }

 }


 
const handleOnlinePayment = async () => {
   console.log("list_items", cartItemsList)
    console.log("totalPrice", totalPrice)
    console.log("addressId", addressList[selectedAddress]?._id);
    
  try {
    toast.loading();

   

    const response = await Axios({
    
      ...SummaryApi.payment_url,


      data: {
        list_items: cartItemsList,
        totalAmt: totalPrice,
        addressId: addressList[selectedAddress]?._id,
        subTotalAmt: totalPrice,
      },
    });

 

    if (response.data?.url) {
      window.location.href = response.data.url;
    } else {
      console.error("No checkout URL found:", response.data);
    }

  } catch (error) {
    AxiosToastError(error);
  }
};






  return (
    <section className='bg-white'>
        <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>

             {/**address */}
              <div className='w-full'>
                <h3 className='text-lg font-semibold'>Choose Your Address</h3>

                <div className='bg-white p-1 grid gap-4'>
                      {
                        addressList.map((address,idx)=>{
                          return (
                            <label htmlFor={idx+"addresslist"} className={!address.status && 'hidden'}>
                            <div className='border rounded bg-blue-50 p-3 flex gap-3 hover:bg-blue-100 cursor-pointer'>
                              <div>
                                 <input type='radio' value={idx} onChange={(e)=> setSelectedAddress(e.target.value)} name='address' id={idx+"addresslist"}/>
                                </div>


                                <div>

                              <p>{address.address_line}</p>
                              <p>{address.city}</p>
                              <p>{address.state}</p>
                              <p>{address.country} - {address.pincode}</p>
                              <p>{address.mobile}</p>
                                  
                                  
                                   </div>
                           
                            
                              </div>
                              </label>
                          )
                        })
                      }

                      
                <div onClick={()=>setOpenAddress(true)} className='h-20 bg-blue-50  border-2 border-dashed flex justify-center items-center cursor-pointer'>
                     Add address

                </div>
                </div>




               
              </div>




             {/** Summary */}
              <div className='w-full max-w-md bg-white py-4 px-2'>
                <h3 className='text-lg font-semibold'>Summary</h3>
                  <div className='bg-white p-4 '>
                                <h3 className='font-semibold'>Bill details </h3>
                                <div className='flex gap-4 justify-between'>
                                  <p>Items total</p>
                                  <p className='flex gap-3 items-center'><span className='line-through text-neutral-400'>{DisplayPriceInRupee(notDiscountPrice)}</span> <span>{DisplayPriceInRupee(totalPrice)}</span></p>
                                </div>
                
                                 <div className='flex gap-4 justify-between'>
                                  <p>Total Quantity</p>
                                  <p className='flex gap-3 items-center'>{totalQuantity} Items</p>
                                </div>
                
                                 <div className='flex gap-4 justify-between'>
                                  <p>Delivery Charge</p>
                                  <p className='flex gap-3 items-center'>free</p>
                                </div>
                
                                <div className='font-semibold flex items-center justify-between gap-4'>
                                  <p>Grand Total</p>
                                  <p>{DisplayPriceInRupee(totalPrice)}</p>
                                </div>
                
                
                
                
                
                
                
                              </div>
              
              <div className='w-full  flex flex-col gap-4'>
              <button onClick={handleOnlinePayment}  className='py-2 px-4 bg-green-500 text-white rounded font-semibold hover:bg-green-700'>Online Payment</button>
              <button onClick={handleCashOnDelivery} className='py-2 px-4 bg-green-500 text-white rounded font-semibold hover:bg-green-700'>Cash on Delivery</button>
              </div>

              </div>





        </div>


        {
            openAddress && (
                <AddAddress close={()=>setOpenAddress(false)}/>
            )
        }

    </section>
  )
}

export default CheckoutPage
