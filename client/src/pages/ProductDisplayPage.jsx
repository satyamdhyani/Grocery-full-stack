import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import { useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import { useEffect } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { DisplayPriceInRupee } from '../utils/DisplayPriceInRupee'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import { CalculateDiscount } from '../utils/CalculateDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {

  const params = useParams()
  console.log(params)
  let productId = params?.product.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })

  const [image,setImage] = useState(0)

  const [loading,setLoading] = useState(false)
  const imagecontainer = useRef()


  const fetchProductDetails = async()=>{

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data : {
          productId : productId
        }

      })
      

      const {data : responseData} = response

      if(responseData.success){
        setData(responseData.data)
        
      }

      console.log("product details",responseData.data)

    }catch(error){
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }


  }


  useEffect(()=>{
    fetchProductDetails()
  },[params])



  const handleScrollRight = ()=>{
    imagecontainer.current.scrollLeft += 100
  }

  
  const handleScrollLeft = ()=>{
    imagecontainer.current.scrollLeft -= 100
  }
  
  return (
   <section className='container mx-auto p-4 grid lg:grid-cols-2'>
    {/**LEFT PART */}
    <div className=''>
      <div className='bg-white-200 lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
        <img
         src={data.image[image]}
         className='w-full h-full object-scale-down'
        />
        
      </div>



      {/* displaying dots means which img is active */}

      <div className='flex items-center justify-center gap-3 my-2'>
        {
          data.image.map((img,idx)=>{
            return(
              <div key={img+idx+"point"} className={`bg-green-200 w-3 h-3 lg:h-5 lg:w-5 rounded-full ${idx === image && "bg-slate-300"}`}> 

              </div>
            )
          })
        }
      </div>





      {/* Displaying all the remaing images */}

      <div className='grid relative'>
        <div ref={imagecontainer} className='flex gap-10 relative z-10 my-3 w-full overflow-x-auto scrollbar-none'> 
              {
          data.image.map((img,idx)=>{
            return(
             <div className='w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md' key={img+idx}>
              <img
               src={img}
               alt = 'min-product'
               onClick={()=>setImage(idx)}
               className='w-full h-full object-scale-down'
              
              
              />


             </div>
            )
          })
        }
        </div>

        <div className='w-full h-full -ml-3  hidden lg:flex lg:justify-between lg:absolute lg:items-center'>
          <button onClick={handleScrollLeft} className='bg-white z-10 relative p-2 h-8 w-8 rounded-full shadow-lg'>
            <FaAngleLeft/>

          </button>

          <button onClick={handleScrollRight} className='bg-white z-10 relative p-2 h-8 w-8 rounded-full shadow-lg'>
            <FaAngleRight/>
          </button>
        </div>

      </div>


      <div className='my-4 grid gap-3'>
       <div>
         <p className='font-semibold'>Description</p>
        <p className='text-base'>{data.description}</p>
       </div>


       <div>
         <p className='font-semibold'>Unit</p>
        <p className='text-base'>{data.unit}</p>
       </div>

       {
        data?.more_details && Object.keys(data?.more_details).map((element,idx)=>{
          return(
        <div>
         <p className='font-semibold'>{element}</p>
         <p className='text-base'>{data?.more_details[element]}</p>
       </div>

          )
        })
       }



      </div>


    </div>




 
    {/**RIGHT PART */}
    <div className='p-4 lg:pl-8 text-base lg:text-lg'>

      <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
      <h2 className='text-lg font-semibold lg:text-xl'>{data.name}</h2>
      <p className=''> Unit:{data.unit}</p>
      <Divider/>
      <div>
        <p>Price</p>
    <div className='flex items-center gap-4'>
        <div className='border border-green-500 px-4 py-2 rounded bg-green-50 w-fit'>
        <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupee(CalculateDiscount(data.price,data.discount))}</p>
      </div>



      {
        data.discount == 0 ? 
        (
         <p></p>
        ):(
          <div>
          <p className='line-through'>{DisplayPriceInRupee(data.price)}</p>
          <p className='font-bold text-green-500 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-700'>Discount</span></p>
          </div>
            
        )
      }
    
    </div>
      </div>

{
  data.stock === 0 ? (
    <p className='text-lg text-red-500 my-2'>Out of stock</p>

  ):(
     <div className='my-4 p-2'>
     <AddToCartButton data={data}/>
     </div>
  )
}
      

      <Divider/>

      <h2 className='font-semibold'>Why People Love Shopping With Us</h2>
      <div>
        <div className='flex items-center gap-4 my-4'>
          <img
          src={image1}
          alt='superfastdelivery'
          className='w-20 h-20'

          
          />

          <div className='text-sm'>
            <div className='font-semibold'>Superfast Delivery</div>
            <p>Get your order at the earliest</p>
          </div>


        </div>


          <div className='flex items-center gap-4 my-4'>
          <img
          src={image2}
          alt='Bestpriceoffers'
          className='w-20 h-20'

          
          />

          <div className='text-sm'>
            <div className='font-semibold'>Best Prices & offers</div>
           <div>
             <p>Best deals and discounts every day.</p>
           </div>
          </div>

          
        </div>


        
      </div>





    </div>
   </section>
  )
}

export default ProductDisplayPage
