import React from 'react'
import banner from '../assets/banner.jpg'
import bannermobile from '../assets/bannermobile.jpg'
import { useSelector } from 'react-redux'
import { validateUrl } from '../utils/validateUrl'
import {  useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'


const Home = () => {

  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state=>state.product.allCategory)
   const subCategoryData = useSelector(state=>state.product.allSubCategory)
   const navigate = useNavigate()

  const handleRedirectProductPage = (id,catname)=>{

    const subCategory = subCategoryData.find(sub=>{
      const filter = sub.category.some(c=>{
        return c._id == id
      })

      return filter ? true : null
    })


   const url = `/${validateUrl(catname)}-${id}/${validateUrl(subCategory.name)}-${subCategory._id}`
   
   navigate(url)
  }

  

  return (
    
   <section className='bg-white'>
    <div className={`container mx-auto bg-blue-100 w-full my-4 ${!banner && "my-2"}`}>
      <div className={`w-full bg-red-500 rounded ${!banner && "animate-pulse"} `}>
        <img
        src={banner}
        className='w-full hidden lg:block lg:h-66 object-cover rounded'
        alt='banner'
        
        />


        <img
        src={bannermobile}
        className='w-full h-full lg:hidden'
        alt='banner'
        
        />

      </div>

    </div>


    <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 '>
      {

        loadingCategory ? (
          
          new Array(12).fill(null).map((c,idx)=>{
            return (
              <div key={"loading"+idx} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                <div className='bg-blue-100 min-h-20 rounded'></div>
                 <div className='bg-blue-100 h-8 rounded'></div>
                  
                
  
                </div>
            )
          })
        ) : (

          categoryData.map((cat,idx)=>{

            return(

             <div key={"category"+idx} className='w-full h-full' onClick={()=>handleRedirectProductPage(cat._id,cat.name)}>
              <div>

                <img
                src={cat.image}
                className='w-full h-full object-scale-down'
                
                />
                </div>
             </div>
            )

          })
        )

      }

    </div>



    {/**category product displaying*/}

    {
      categoryData.map((c,idx)=>{
        return(
          <CategoryWiseProductDisplay key={c?._id+"CategoryWiseProduct"} id={c?._id} name={c?.name}/>

        )
      })
    }





   </section>
  )
}

export default Home
