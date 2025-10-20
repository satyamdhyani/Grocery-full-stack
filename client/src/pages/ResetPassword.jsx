import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const [data,setData] = useState({
      email : "",
      newPassword : "",
      confirmPassword : ""

    })

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)



    const validateValue = Object.values(data).every(el=>el)


    useEffect(()=>{
      if(!(location?.state?.data?.success)){
        navigate("/")
      }


      if(location?.state?.email){
        setData((prev)=>{
          return {
            ...prev,
            email : location?.state?.email
          }

        })

      }



    },[])



    const handleChange = (e)=>{
      const { name,value} = e.target
  
  
      setData((prev)=>{
        return {
          ...prev,
          [name] : value
        }
        
      })
    }
  





    const handleSubmit = async(e)=>{
      e.preventDefault();


      if(data.newPassword !== data.confirmPassword){
        toast.error("New password and confirm password must be same");
        return
      }
    
  
  
    try{
    const response = await Axios({
      ...SummaryApi.resetPassword,
         data : data,
  
    }) 
  
  if(response.data.error){
    toast.error(response.data.message)
  }
  
  if(response.data.success){
    toast.success(response.data.message);
    navigate("/login")
       setData({
        email : "",
        newPassword : "",
        confirmPassword : ""


       })
  
  
      setData({
        email : "",
      })
     
  }
  
  
  
  
  } catch(err){
    AxiosToastError(err);
  }
  
  }



    

  return (
    
           <section className=' w-full container mx-auto px-2'>
       <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg mb-2'>Enter your new password</p>


        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
            

           <div className='grid gap-1'>
           
                           <label htmlFor='newPassword'>New Password :</label>
                           
                           <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                           <input 
                             type = {showPassword ? "text" : "password"}
                             id = "password"
                             className='w-full outline-none'
                             name = 'newPassword'
                             value={data.newPassword}
                             onChange={handleChange}
                             placeholder='Enter your new password'
                           />
                          
           
                          <div onClick={()=> setShowPassword(prev => !prev)} className='cursor-pointer'>
                          {
                          showPassword ? (
                             <FaEye/>
                           ) : (
                             <FaEyeSlash/>
           
                           )
                         
           
                          }
                          </div>
                          </div>
            </div>



            <div className='grid gap-1'>
           
           <label htmlFor='confirmPassword'>Confirm Password :</label>
           
           <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
           <input 
             type = {showConfirmPassword ? "text" : "password"}
             id = "password"
             className='w-full outline-none'
             name = 'confirmPassword'
             value={data.password}
             onChange={handleChange}
             placeholder='Enter your Confirm password'
           />
          

          <div onClick={()=> setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
          {
           showConfirmPassword?(
             <FaEye/>
           ) : (
             <FaEyeSlash/>

           )
         

          }
          </div>
          </div>
</div>

          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-500" : "bg-gray-700"} text-white py-2 rounded font-semibold mt-2 my-2`}>Change Password</button>
        </form>

        <p>
            Already have account? <Link to = {"/login"} className='font-semibold text-green-600'> Login </Link>
        </p>
       </div>
      
    </section>
      
    
  )
}

export default ResetPassword
