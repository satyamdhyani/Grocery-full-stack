
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice.js';
import { useDispatch } from 'react-redux';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice.js';
import SummaryApi from './common/SummaryApi.js';
import Axios from './utils/Axios.js';
import { handleAddItemCart } from './store/cartProduct.js';
import GlobalProvider from './provider/GlobalProvider.jsx';
import CartMobile from './components/CartMobile.jsx';

function App() {

  const dispatch = useDispatch()
  const location = useLocation()
 

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
   
    dispatch(setUserDetails(userData.data))
  }


   const fetchCategory = async()=>{

    try{
      
      const response = await Axios({
        ...SummaryApi.getCategory

      })

      const {data : responseData} = response

      if(responseData.success){
        dispatch(setAllCategory(responseData.data))
       
      }

      console.log(responseData)

    }catch(error){

    } finally{
      
    }
  }


     const fetchSubCategory = async()=>{

    try{
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getsubcategory

      })

      const {data : responseData} = response

      if(responseData.success){
        dispatch(setAllSubCategory(responseData.data))
       
      }

      console.log(responseData)

    }catch(error){

    } finally{
      dispatch(setLoadingCategory(false))
      
    }
  }


 

 


  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
  },[])
 

  return (
    <GlobalProvider>
    <Header/>

   <main className='min-h-[78vh]' >
     <Outlet/>
   </main>
   

   <Footer/>
   <Toaster/>

   {
    location.pathname !== '/checkout' && (
        <div className='p-2 sticky bottom-4'>
       <CartMobile/>
       </div>
    )
   }

  

   
   </GlobalProvider>
  )
}

export default App
