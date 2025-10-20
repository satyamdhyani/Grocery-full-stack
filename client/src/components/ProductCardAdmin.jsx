import React, { useState } from 'react'
import EditProductAdminpage from './EditProductAdminpage'
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'


const ProductCardAdmin = ({data,fetchProductData}) => {

  const [editOpen,setEditOpen] = useState(false)
  const [openDelete,setOpenDelete] = useState(false)

  const handleCancel = ()=>{
    setOpenDelete(false)
  }

  const handleDelete = async()=>{
    try{
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data : {
          _id : data._id
        }

      })

      const {data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        if(fetchProductData){
          fetchProductData()
        }
        setOpenDelete(false)
      }

    }catch(error){
      AxiosToastError(error)
    }

  }


  return (
    <div className='w-36 flex flex-col justify-between p-4 bg-white rounded'>
        <div className='w-full h-36 flex items-center justify-center'>
            <img
            src={data?.image[0]}
            alt={data.name}
            className='max-h-full object-contain'
            />
        </div>

        <div className='mt-2'>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-500'>{data?.unit} unit</p>
         </div>
        <div className='flex justify-between items-center gap-2 mt-2 w-12'>
          <button onClick={()=>setEditOpen(true)} className='border p-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit</button>
          <button onClick={()=>setOpenDelete(true)} className='border text-sm border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded p-1'>Delete</button>
        </div>


        {
          editOpen && (
              <EditProductAdminpage fetchProductData={fetchProductData} data={data} close={()=>setEditOpen(false)}/>
          )
        }

        {
          openDelete && (
            <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex justify-center items-center '>
              <div className='bg-white p-4 w-full max-w-md rounded'>

                <div className='flex items-center justify-between gap-4'>
                  <h3 className='font-semibold'>Permanent Delete</h3>
                  <button onClick={()=>setOpenDelete(false)}>
                    <IoClose size={25}/>


                  </button>
                </div>
                <p className='my-2'>Are you sure want to delete permanent ?</p>
                <div className='flex justify-end gap-4 my-4'>
                  <button onClick={handleCancel} className='border px-3 py-2 rounded bg-slate-200 border-black-300 hover:bg-slate-300 '>Cancel</button>
                  <button onClick={handleDelete} className='border px-3 py-2 rounded bg-red-300 border-red-500 hover:bg-red-400'>Delete</button>
                </div>

              </div>
              
            </section>
          )
        }

        
        
    </div>
  )
}

export default ProductCardAdmin
