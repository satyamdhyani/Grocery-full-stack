import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';




const ForgotPassword = () => {

  const [data,setData] = useState({
    email : "",
  })


  const navigate = useNavigate();

  const handleChange = (e)=>{
    const { name,value} = e.target


    setData((prev)=>{
      return {
        ...prev,
        [name] : value
      }
      
    })
  }


  const validateValue = Object.values(data).every(el=>el)

 
  

  const handleSubmit = async(e)=>{
    e.preventDefault();
  


  try{
  const response = await Axios({
    ...SummaryApi.forgot_password,
       data : data,

  }) 

if(response.data.error){
  toast.error(response.data.message)
}

if(response.data.success){
  toast.success(response.data.message);
  navigate("/verify-forgot-password-otp",{
    state : data
});

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
        <p className='font-semibold text-lg mb-2'>Forgot password</p>





        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
            

            <div className='grid gap-1'>
                <label htmlFor='email'>Email :</label>
                <input 
                  type = "email"
                  id = "email"
                  className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                  name = 'email'
                  value={data.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                />

                
           

            
          
               <Link to={"/verify-forgot-password-otp"} className='block ml-auto hover:text-yellow-400'>Forgot password?</Link>
            </div>




             


          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-500" : "bg-gray-700"} text-white py-2 rounded font-semibold mt-2 my-2`}>Send Otp</button>

          
        </form>

        <p>
            Already have account? <Link to = {"/login"} className='font-semibold text-green-600'> Login </Link>
        </p>
       </div>
      
    </section>
  )
}

export default ForgotPassword

