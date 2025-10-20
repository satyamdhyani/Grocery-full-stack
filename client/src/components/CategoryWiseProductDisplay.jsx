import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { LiaAngleDoubleLeftSolid } from "react-icons/lia";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { useSelector } from 'react-redux'
import { validateUrl } from '../utils/validateUrl'

const CategoryWiseProductDisplay = ({id,name}) => {
    
    const [data,setData] = useState([])
    const[loading,setLoading] = useState(false)
    const containerRef = useRef()

   const subCategoryData = useSelector(state=>state.product.allSubCategory)
   
   const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async()=>{
        try{
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data : {
                    id : id
                }
            })

            const {data : responseData} = response

            if(responseData.success){
                setData(responseData.data)
            }


        }catch(error){
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategoryWiseProduct()
    },[])

    const handleScrollRight = ()=>{
        containerRef.current.scrollLeft += 250
    }

      const handleScrollLeft = ()=>{
        containerRef.current.scrollLeft -= 250
    }


    
 
  

  const handleRedirectProductPage = ()=>{

    const subCategory = subCategoryData.find(sub=>{
      const filter = sub.category.some(c=>{
        return c._id == id
      })

      return filter ? true : null
    })



 
   const url = `/${validateUrl(name)}-${id}/${validateUrl(subCategory?.name)}-${subCategory?._id}`
   
   return url
  }

  const handleSeeAllUrl = handleRedirectProductPage()


  return (
    <div>
         <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
           <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
           <Link  to={handleSeeAllUrl} className='text-green-600 hover:text-green-400'>See All</Link>
   
         </div>
   
       <div className='relative flex items-center'>
          <div className='flex gap-4 md:gap-6 lg:gap-9 container mx-auto px-4 overflow-x-scroll lg:overflow-hidden scrollbar-none scroll-smooth'ref={containerRef}>
            {
                loading && 
                loadingCardNumber.map((el,idx)=>{
                    return(
                        <CardLoading key={idx+"categorywiseProductDisplay"}/>
                    )
                })


            }


            {
                data.map((p,idx)=>{
                    return(
                        <CardProduct data={p} key={p._id+"categorywiseProductDisplay"+idx}/>
                    )
                })
            }

        
         </div>

             <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full text-lg'>
                    <LiaAngleDoubleLeftSolid/>

                </button>

                <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full text-lg'>
                    <LiaAngleDoubleRightSolid/>
                </button>
            </div>
       </div>
       </div>
  )
}

export default CategoryWiseProductDisplay
