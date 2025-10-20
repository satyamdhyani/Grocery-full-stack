import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSubcategory = ({close,data,fetchData}) => {
    const [subCategorydata , setsubCategorydata] = useState({
        _id : data._id,
        name : data.name,
        image : data.image,
        category : data.category || []


    })


    const allCategory = useSelector(state=>state.product.allCategory)


    const handleChange = (e)=>{
        const {name,value} = e.target
        setsubCategorydata((preve)=>{
            return{
                ...preve,
                [name] : value,

            }
        })
    }




    const handleUploadSubCategoryImage = async (e)=>{
        const file = e.target.files[0]


        if(!file){
            return
        }

         const response = await uploadImage(file)
      const {data : ImageResponse} = response
      
      setsubCategorydata((preve)=>{
        return{
          ...preve,
          image : ImageResponse.data.url

        }
      })
    }


    const handleRemoveCategorySelected = (categoryid)=>{
        const index = subCategorydata.category.findIndex(el=>el._id === categoryid)

         subCategorydata.category.splice(index,1)
         setsubCategorydata((preve)=>{
            return{
                ...preve

            }
         })

    }


    const handleSubmitSubcategory = async(e)=>{
        e.preventDefault()
        try{
            const response = await Axios({
                ...SummaryApi.updatesubcategory,
                data : subCategorydata
            })

            const {data : responsedata} = response

            if(responsedata.success){
                toast.success(responsedata.message)
                if(close){
                    close()
                }

                if(fetchData){
                    fetchData()
                }
            }
        }catch(error){
            AxiosToastError(error)


        }
    }





  return (
   <section className ='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
    <div className='w-full max-w-6xl bg-white p-4 rounded'>
       <div className='flex items-center justify-between gap-3'>
        <h1 className='font-semibold'> Edit Subcategory </h1>
        <button onClick={close}>
            <IoClose size={25}/>
        </button>
       </div>

       <form className='my-4 grid gap-3' onSubmit={handleSubmitSubcategory}>
        
        <div className='grid gap-1'> 
            <label htmlFor='name'>Name</label>
            <input
                id='name'
                name='name'
                value={subCategorydata.name}
                onChange={handleChange}
                className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded'
            
            
            />
        </div>   

             <div className='grid gap-1'>
                <p>Image</p>


                <div className='flex flex-col lg:flex-row items-center gap-3'>

                <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                    {
                        !subCategorydata.image ? (
                            <p className='text-sm text-neutral-400'>No image</p>
                        ):(
                            <img src={subCategorydata.image} alt='SubCategory' className='w-full h-full object-scale-down'/>
                        )
                    }


               
               
                </div>

                <label htmlFor='uploadsubcategoryimage'>

                     <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:text-neutral-800 hover:bg-primary-200 cursor-pointer'>
                    Upload Image
                </div>


                </label>

                <input
                  className='hidden'
                  type='file'
                  id='uploadsubcategoryimage'
                  onChange={handleUploadSubCategoryImage}


                
                />

               


                
             </div>
             </div>


             <div className='grid gap-1'>
                <label>Select Category</label>


                 <div className='border focus-within:border-primary-200 rounded'>
                {/** display value */}

                <div className='flex flex-wrap gap-2'>

                {
                    subCategorydata.category.map((cat,idx)=>{
                        return(
                            <p key={cat._id+"selectedvalue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>{cat.name}
                            <div className='hover:cursor-pointer hover:text-red-600'onClick={()=>handleRemoveCategorySelected(cat._id)}><IoClose/></div>
                            </p>
                        )
                    })
                }

                </div>


                {/** select category */}
                <select className='w-full p-2 bg-transparent outline-none border' onChange={(e)=>{
                    const value = e.target.value
                    const categoryDetails = allCategory.find(el=>el._id == value)
                    setsubCategorydata((preve)=>{
                        return{
                            ...preve,
                            category : [...preve.category,categoryDetails]
                        }
                    })

                   

                }}>
                 <option value={""} disabled>Select category</option>

                 {
                    allCategory.map((category,idx)=>{
                        return(
                        <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                        )
                    })
                 }

                    
                   

                </select>
             </div>
             </div>


             







         <button className={`px-4 py-1 border
               ${subCategorydata.name && subCategorydata.image && subCategorydata.category[0] ?"bg-primary-200 hover:bg-primary-100" :  "bg-gray-200" }
               font-semibold
               `


         }>Submit</button>


       
       </form>

    </div>
    

   </section>
  )
}

export default EditSubcategory

