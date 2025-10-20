import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';

const Address = () => {

  const addressList = useSelector(state=>state.addresses.addressList)
   const [openAddress,setOpenAddress] = useState(false)
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  

  const {fetchAddress} = useGlobalContext()



  const handleDisableAddress = async(id)=>{

    console.log("DisableAddressID", id)
    try{
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }  

      })

      const {data : responseData} = response

      console.log("responseData",responseData)

      if(responseData.success){
        toast.success("Address Remove")
        if(fetchAddress){
          fetchAddress()
        }
      }

    }catch(error){
      AxiosToastError(error)

    }

  }













  return (
    <div className=''>
      <div className='bg-white shadow-md px-2 py-2 flex justify-between gap-4 items-center'>
        <h2 className='font-semibold'>Address</h2>
        <button onClick={()=>setOpenAddress(true)} className='border border-primary-200 text-primary-200 px-2 py-1 rounded-full hover:bg-primary-200 hover:text-white'>
          Add Address

        </button>
      </div>
           <div className='bg-white p-1 grid gap-4'>
                      {
                        addressList.map((address,idx)=>{
                          return (
                          
                            <div className={`border rounded bg-blue-50 p-3 flex gap-3 justify-between ${!address.status && 'hidden'}`}  key={idx +"address"}>
                             
                             


                              <div>

                              <p>{address.address_line}</p>
                              <p>{address.city}</p>
                              <p>{address.state}</p>
                              <p>{address.country} - {address.pincode}</p>
                              <p>{address.mobile}</p>
                                  
                                  
                                   </div>

                                <div className='px-2'>

                                  <button onClick={()=>{
                                    setOpenEdit(true)
                                    setEditData(address)



                                  }} className='px-4 hover:text-yellow-500 text-green-500'>
                                    <MdModeEditOutline  size={20}/>
                                  </button>
                                
                                <button onClick={()=>handleDisableAddress(address._id)} className='hover:text-red-800 px-1 text-red-500'>
                                <MdDelete size={20}/>
                                </button>
                               

                                </div>
                           
                            
                              </div>
                           
                          )
                        })
                      }

                      
               
                </div>

                 {
            openAddress && (
                <AddAddress close={()=>setOpenAddress(false)}/>
            )
        }


        {
          openEdit && (
            <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
          )
        }

      
    </div>
  )
}

export default Address
