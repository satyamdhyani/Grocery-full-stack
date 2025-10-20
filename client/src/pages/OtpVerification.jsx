import React, { useEffect, useRef, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';




const OtpVerification = () => {

  const [data,setData] = useState(["","","","","",""])
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation()



  useEffect(()=>{
    if(!location?.state?.email){
        navigate("/forgot-password");

    }

  },[])

  

  

  const validateValue = data.every(el=>el)


  const handleSubmit = async(e)=>{
    e.preventDefault();
  


  try{
  const response = await Axios({
    ...SummaryApi. forgot_password_otp_verification,
       data : {
        otp : data.join(""),
        email : location?.state?.email
       },

  }) 

if(response.data.error){
  toast.error(response.data.message)
}

if(response.data.success){
  toast.success(response.data.message);
    setData(["","","","","",""])
    navigate("/reset-password",{

        state : {
            data : response.data,
            email : location?.state?.email,
        }
    })
}




} catch(err){
  AxiosToastError(err);
}

}



  return (
    <section className=' w-full container mx-auto px-2'>
       <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg mb-2'>Enter OTP</p>


        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
            

            <div className='grid gap-1 '>
                <label htmlFor='otp'> Enter your OTP:</label>

                <div className='flex items-center gap-2 justify-between mt-3'>
                    {
                        data.map((ele,idx)=>{
                            return(
                                <input 
                                key={"otp"+idx}
                                type = "text"
                                id = "otp"
                                ref={(ref)=>{
                                    inputRef.current[idx] = ref
                                    return ref

                                }}
                                value={data[idx]}
                                onChange={(e)=>{
                                    const value = e.target.value
                                    
                                    const newData = [...data]
                                    newData[idx] = value

                                    setData(newData)

                                    if(value && idx < 5){
                                        inputRef.current[idx+1].focus()
                                    }
 
                                }}

                                maxLength={1}
                                className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold'
                               
                              />

                            )
                        })
                    }


                </div>

               

                
           

            
          
               <Link to={"/verify-forgot-password-otp"} className='block ml-auto hover:text-yellow-400'>Forgot password?</Link>
            </div>




             


          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-500" : "bg-gray-700"} text-white py-2 rounded font-semibold mt-2 my-2`}>Verify Otp</button>

          
        </form>

        <p>
            Already have account? <Link to = {"/login"} className='font-semibold text-green-600'> Login </Link>
        </p>
       </div>
      
    </section>
  )
}

export default OtpVerification


