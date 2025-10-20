import React from 'react'
import { useSelector } from 'react-redux'
import Nodata from '../components/Nodata'

const MyOrders = () => {
  const orders = useSelector(state=>state.orders.order)

  
  return (
    <div>
      <div className='bg-white shadow-md p-e font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] &&(
            <Nodata/>
          )
        }

        {
          orders.map((order,idx)=>{
            return(
              <div key={order._id+idx+"order"} className='order rounded p-4 text-sm'>
                <p>Order Id : {order?.orderId}</p>
                <div className='flex gap-3'>
                  <img src={order.product_details.image[0]}
                  className='w-14 h-14'
                  
                  />
                  <p className='font-semibold'>{order.product_details.name}</p>

                  </div>


                 </div>
            )
          })
        }
      
    </div>
  )
}

export default MyOrders
