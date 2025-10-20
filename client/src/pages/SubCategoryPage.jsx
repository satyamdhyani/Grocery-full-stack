import React, { useEffect, useState } from 'react'
import UploadSubcategoryModel from '../components/UploadSubcategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import {createColumnHelper} from '@tanstack/react-table'
import Viewimage from '../components/Viewimage'
import { GoPencil } from "react-icons/go";
import { MdDeleteSweep } from "react-icons/md";
import EditSubcategory from '../components/EditSubcategory'
import Confirmbox from '../components/Confirmbox'
import toast from 'react-hot-toast'

const SubCategoryPage = () => {

  const [openAddSubcategory,setopenAddSubcategory] = useState(false)
  const [data , setData] = useState([])
  const [loading,setloading] = useState(false)
  const columnHelper = createColumnHelper()
  const [imageurl,setImageurl] = useState("")
  const [openEdit,setOpenEdit] = useState(false)

  const [editdata,seteditData] = useState({
    _id : ""
  })


  const [deletesubcategory,setDeletesubcategory] = useState({
    _id : ""
  })


  const [openDeleteConfirmbox,setOpenDeleteConfirmbox] = useState(false)




  const fetchsubcategory = async()=>{
    try{
      setloading(true)
      const response = await Axios({
        ...SummaryApi.getsubcategory
      })

      const {data : responsedata} = response
      
      if(responsedata.success){
        setData(responsedata.data)


      }

    }catch(error){
      AxiosToastError(error)
    }finally{
      setloading(false)
    }
  }

  useEffect(()=>{
    fetchsubcategory()
  },[])


  const column =[
   columnHelper.accessor('name',{
    header : "Name"
   }),columnHelper.accessor('image',{
    header : "Image",
    cell : ({row})=>{
      return <div className='flex justify-center items-center'>
      
      <img
              src={row.original.image}
              alt={row.original.name}
              className='w-8 h-8 cursor-pointer'
              onClick={()=>{
                setImageurl(row.original.image)
              }}
      
      />
      </div>
    }
   }),
   columnHelper.accessor("category",{
     header : "Category",
     cell : ({row})=>{
      return(
        <>

        {
          row.original.category.map((c,index)=>{
            return(
              <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
            )
          })
        }
        
        </>
      )
     }
   }),
   columnHelper.accessor("_id",{
    header : "Action",
    cell : ({row})=>{
      return (

        <div className='flex items-center justify-center gap-3'>
          <button onClick={()=>{
            setOpenEdit(true)
            seteditData(row.original)
          }} className='p-2 bg-green-100 rounded-full hover:bg-green-300'>
            <GoPencil size={20}/>

          </button>
         

          <button onClick={()=>{
            setOpenDeleteConfirmbox(true)
            setDeletesubcategory(row.original)
          }}className='p-2 bg-red-100 rounded-full hover:bg-red-300'>
             <MdDeleteSweep size={20}/>

          </button>
        </div>
      )

    }
   })

  ]



  const handleDeletesubcategory =async()=>{

    try{
      const response =await Axios({
        ...SummaryApi.deletesubcategory,
        data : deletesubcategory
      })

      const {data : responseData} = response

     

      if(responseData){
        toast.success(responseData.message)
        fetchsubcategory()
        setOpenDeleteConfirmbox(false)
        setDeletesubcategory({_id : ""})
      }

    }catch(error){
      AxiosToastError(error)
    }
  }


  return (
    <section>
    <div className='p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>

        <button onClick={()=>setopenAddSubcategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1'>Add Sub Category</button>
    </div>


    <div className='overflow-auto w-full max-w-[95vw]'>
       <DisplayTable
       data={data}
       column={column}
       />
    </div>



       {
        openAddSubcategory && (
          <UploadSubcategoryModel
          close={()=>setopenAddSubcategory(false)}
          fetchData={fetchsubcategory}
          />

        )

       }


       {

        imageurl && 
        <Viewimage url={imageurl} close={()=>setImageurl("")}/>
       }

       {
        openEdit && 
        <EditSubcategory 
        data={editdata} 
        close={()=>setOpenEdit(false)}
        fetchData={fetchsubcategory}
        
        />
       }



       {
        openDeleteConfirmbox && (
          <Confirmbox
          cancel={()=>setOpenDeleteConfirmbox(false)}
          close={()=>setOpenDeleteConfirmbox(false)}
          confirm={handleDeletesubcategory}

          
          />
        )
       }






    </section>
  )
}

export default SubCategoryPage
