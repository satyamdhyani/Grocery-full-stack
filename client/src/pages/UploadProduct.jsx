import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/uploadImage';
import Loading from '../components/Loading';
import Viewimage from '../components/Viewimage';
import { MdDeleteSweep } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import Addfieldcomponent from '../components/Addfieldcomponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';


const UploadProduct = () => {
  const [data,setData] = useState({
    name : "",
    image : [],
    category : [],
    subcategory : [],
    unit : "",
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
    
  })


  const [imageLoading,setimageLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state=>state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState("")
  const [selectSubCategory,setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state=>state.product.allSubCategory)

  
  const [openAddField,setOpenAddField] = useState(false)
  const [fieldname,setFieldname] = useState("")


  const handlechange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value

      }
    })
  }


  const handleuploadImage = async (e)=>{
    const file = e.target.files[0]


    if(!file){
      return
    }

    setimageLoading(true)

    const response = await uploadImage(file)
    const {data : ImageResponse} = response
    const imageUrl = ImageResponse.data.url

    setData((preve)=>{
      return{
        ...preve,
        image : [...preve.image,imageUrl]

      }
    })
    setimageLoading(false)

    

    

  }


  const handleDeleteImage = async(idx)=>{
    data.image.splice(idx,1)
    setData((preve)=>{
      return{
        ...preve

      }
    })
  }


  const handleRemoveCategory = async(idx)=>{
    data.category.splice(idx,1)
    setData((preve)=>{
      return{
        ...preve
      }

    })
  }


  const handleRemoveSubCategory = async(idx) =>{
    data.subcategory.splice(idx,1)
    setData((preve)=>{
      return{
        ...preve
      }

    })

  }


  const handleAddfield = ()=>{
    setData((preve)=>{
      return{
        ...preve,
        more_details : {
          ...preve.more_details,
          [fieldname] : ""

        }
      }

    })

    setFieldname("")
    setOpenAddField(false)
  }



  const handlesubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await Axios({
        ...SummaryApi.createproduct,
        data : data
      })

      const {data : responseData} = response

      if(responseData.success){
        successAlert(responseData.message)
        setData({
          name : "",
          image : [],
          category : [],
          subcategory : [],
          unit : "",
          stock : "",
          price : "",
          discount : "",
          description : "",
          more_details : {},

        })

      }

    }catch(error){
      AxiosToastError(error)

    }

  }


  return (
    <section>
  <div className='p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'> Upload Product</h2>

        
    </div>

    <div className='grid p-3'>
      <form className='grid gap-4'onSubmit={handlesubmit}>
        <div className='grid gap-1'>
          <label htmlFor='name'className='font-medium'>Name</label>
          <input
          id='name'
          type='text'
          placeholder='Enter product name'
          name='name'
          value={data.name}
          onChange={handlechange}
          required
          className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          
          />
        </div>

         <div className='grid gap-1'>
          <label htmlFor='description'className='font-medium'>Description</label>
          <textarea
          id='description'
          type='text'
          placeholder='Enter Product Description'
          name='description'
          value={data.description}
          onChange={handlechange}
          required
          multiple
          rows={3}
          className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
         
          
          />
        </div>


        {/**IMAGE */}

        <div>
          <p className='font-medium'>Image</p>
         <div>
            <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
            <div className='flex justify-center items-center flex-col'>

            {
              imageLoading ? <Loading/> : (
                <>
              <FaCloudUploadAlt size={36}/>
              <p>Upload Image</p>
                </>
              )
            }
              
            </div>


            <input
              type='file'
              id='productImage'
              className='hidden'
              accept='image/*'
              onChange={handleuploadImage}
            
            />


          </label>

          {/** display uploaded images */}

          <div className=' flex flex-wrap gap-4'>
            {
              data.image.map((img,idx)=>{
               return(
                <div key={img+idx} className='h-20 w-20 min-w-20 mt-1 bg-blue-50 border relative group'>
                  <img src={img}
                  alt={img}
                  className='w-full h-full object-scale-down cursor-pointer'
                  onClick={()=>setViewImageUrl(img)}
                  
                  />
                  <div onClick={()=>handleDeleteImage(idx)} className='absolute bottom-0 right-0 p-1 bg-red-300 rounded-full hover:bg-red-700 hidden group-hover:block cursor-pointer '>
                    <MdDeleteSweep/>

                  </div>
                  </div>
               )
              })
            }

          </div>
         </div>
        </div>


        {/**CATEGORY */}

        <div className='grid gap-1'>
          <label className='font-medium'>Category</label>
          <div>
          <select
          className='bg-blue-50 border w-full p-2 rounded'
          value={selectCategory}
          onChange={(e)=>{
               const value = e.target.value
               const category = allCategory.find(el=>el._id === value)

               setData((preve)=>{
                return{
                  ...preve,
                  category : [...preve.category,category]

                }
               })
               setSelectCategory("")
          }}
          >
            <option value={""}>Select Category</option>
            {
              allCategory.map((c,idx)=>{
                return(
                  <option value={c?._id}>{c.name}</option>


                )
              })
            }
          </select>

        <div className='flex flex-wrap gap-3'>
            {
            data.category.map((c,idx)=>{
              return(
                <div key={c._id+idx+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                  <p>{c.name}</p>
                  <div className='hover:text-red-500 cursor-pointer'onClick={()=>handleRemoveCategory(idx)}><IoClose size={20}/> </div>
                   </div>
              )

              
            })
          }
        </div>
          </div>
        </div>



        {/**SUBCATEGORY */}

        <div className='grid gap-1'>
          <label className='font-medium'> Sub Category</label>
          <div>
          <select
          className='bg-blue-50 border w-full p-2 rounded'
          value={selectSubCategory}
          onChange={(e)=>{
               const value = e.target.value
               const subcategory = allSubCategory.find(el=>el._id === value)

               setData((preve)=>{
                return{
                  ...preve,
                  subcategory : [...preve.subcategory,subcategory]

                }
               })
               selectSubCategory("")
          }}
          >
            <option value={""}>Select Sub Category</option>
            {
              allSubCategory.map((c,idx)=>{
                return(
                  <option value={c?._id}>{c.name}</option>


                )
              })
            }
          </select>

        <div className='flex flex-wrap gap-3'>
            {
            data.subcategory.map((c,idx)=>{
              return(
                <div key={c._id+idx+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                  <p>{c.name}</p>
                  <div className='hover:text-red-500 cursor-pointer'onClick={()=>handleRemoveSubCategory(idx)}><IoClose size={20}/> </div>
                   </div>
              )

              
            })
          }
        </div>
          </div>
        </div>


        {/**UNIT */}

        <div className='grid gap-1'>
          <label htmlFor='unit'className='font-medium'>Unit</label>
          <input
          id='unit'
          type='text'
          placeholder='Enter product unit'
          name='unit'
          value={data.unit}
          onChange={handlechange}
          required
          className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          
          />
        </div>

        {/**STOCK */}

        <div className='grid gap-1'>
          <label htmlFor='stock'className='font-medium'>Number Of Stock</label>
          <input
          id='stock'
          type='number'
          placeholder='Enter product stock'
          name='stock'
          value={data.stock}
          onChange={handlechange}
          required
          className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          
          />
        </div>




        {/**PRICE */}

        <div className='grid gap-1'>
          <label htmlFor='price'className='font-medium'>Price</label>
          <input
          id='price'
          type='number'
          placeholder='Enter product price'
          name='price'
          value={data.price}
          onChange={handlechange}
          required
          className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          
          />
        </div>


        {/**DISCOUNT */}

          <div className='grid gap-1'>
          <label htmlFor='discount'className='font-medium'>Discount</label>
          <input
          id='discount'
          type='number'
          placeholder='Enter product discount'
          name='discount'
          value={data.discount}
          onChange={handlechange}
          required
          className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          
          />
        </div>


        {/**add more field */}


        <div>
          {
            Object?.keys(data?.more_details)?.map((k,idx)=>{
              return(
          <div className='grid gap-1'>
          <label htmlFor={k} className='font-medium'>{k}</label>
          <input
          id={k}
          type='text'
          value={data?.more_details[k]}
          onChange={(e)=>{
            const value = e.target.value
            setData((preve)=>{
              return{
                ...preve,
                more_details : {
                  ...preve.more_details,
                  [k] : value
                }
              }
            })
          }}
          required
          className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          
          />
        </div>
              )
            })
          }
        </div>

        <div onClick={()=>setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
          Add Fields
        </div>


        <button className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'>Submit</button>



      </form>
    </div>

    {
      viewImageUrl && (
        <Viewimage url={viewImageUrl} close={()=>setViewImageUrl("")}/>
      )
    }


    {
      openAddField && (
        <Addfieldcomponent
        value={fieldname}
        onChange={(e)=>setFieldname(e.target.value)}
        submit={handleAddfield}

        
        close={()=>setOpenAddField(false)}
        
        />
      )
    }
    </section>

  )
}

export default UploadProduct
