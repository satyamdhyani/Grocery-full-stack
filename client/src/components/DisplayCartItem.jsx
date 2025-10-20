import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupee } from '../utils/DisplayPriceInRupee'
import { RxTriangleRight } from "react-icons/rx";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { CalculateDiscount } from '../utils/CalculateDiscount'
import EmptyImage from '../assets/empty_cart.webp'

const DisplayCartItem = ({close}) => {
  const {notDiscountPrice,totalPrice, totalQuantity} = useGlobalContext()
  const cartItem = useSelector(state => state.cartItem.cart)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const redirectToCheckOutPage = ()=>{
    if(user?._id){
      navigate('/checkout')
      if(close){
        close()
      }
      return

    }

    


  }




  return (
    <section className='bg-neutral-900 fixed top-0 left-0 right-0 bottom-0 bg-opacity-70 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'>Cart</h2>

                
                
                {/**FOR MOBILE */}


                <Link to={"/"} className='lg:hidden'>
                   <IoClose size={25}/>
                </Link>


       

                 {/** FOR  DESKTOP */}


                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={25}/>
                </button>
            </div>


            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-120px)] bg-blue-50 p-2 overflow-auto scrollbar-none'>
              {/**DISPLAY ITEMS */}

              {
                cartItem[0] ? (
                    <> 
                <div className='flex items-center justify-between px-2 py-2 bg-blue-100 text-blue-500 rounded-full'>
                <p>Your total Savings</p>
                <p>{DisplayPriceInRupee(notDiscountPrice-totalPrice)}</p>
              </div>

              <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                {
                  cartItem[0] && (
                    cartItem.map((item,idx)=>{
                      return (
                        <div key={item?._id+"cartItemDisplay"} className='flex w-full gap-2'>
                          <div className='w-16 h-16 border rounded min-h-16 min-w-16'>
                            <img
                               src={item?.productId?.image[0]}
                               className='object-scale-down'
                            
                            />

                           



                            </div>


                           <div className='w-full'>
                            <div className='w-full flex items-center py-1'>
                              <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                               
                              
                               </div>
                               <p className='text-xs w-full text-slate-500'>{item?.productId?.unit} Unit</p>
                               <p className='text-xs font-semibold'>{DisplayPriceInRupee(CalculateDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                               </div>

                            

                            
                            <div className=''>
                              <AddToCartButton data={item?.productId}/>
                              
                               </div>
                           



                        
                               

                               





                          </div>
                          
                      )
                    })
                  )
                }
              </div>

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
                      </>
                ) : (
                    <div>
                      <img src={EmptyImage}
                       className = "w-full h-full object-scale-down"
                      
                      
                      
                      />
                     
                      </div>
                )
              }

              </div>
              


              

          {/** PROCEED TO PAYMENT BUTTON */}

          {
            cartItem[0] && (
            <div className='p-2'>
                
            <div className='bg-green-700 text-neutral-100 p-1 py-3 text-base lg:py-4 sticky bottom-3 rounded flex items-center gap-4 justify-between'>
              <div>
                {DisplayPriceInRupee(totalPrice)}
              </div>

             

              <button className='flex items-center gap-0' onClick={redirectToCheckOutPage}>
                Proceed
                <span><RxTriangleRight size={20}/></span>
              </button>
            </div>
  
                </div>
            )
          }
          


        
             

          


        

        </div>

    </section>
  )
}

export default DisplayCartItem
