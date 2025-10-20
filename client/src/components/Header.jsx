import React, { useEffect, useState } from 'react'
import Search from './Search.jsx'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile.jsx';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu.jsx';
import Grocery from "../assets/Grocery.jpg"
import { DisplayPriceInRupee } from '../utils/DisplayPriceInRupee.js';
import { useGlobalContext } from '../provider/GlobalProvider.jsx';
import DisplayCartItem from './DisplayCartItem.jsx';

const Header = () => {
  const[ isMobile ] =  useMobile();
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state)=> state?.user)
  const [openUserMenu , setopenUserMenu] = useState(false);
  const cartItem = useSelector(state => state.cartItem.cart)
  // const [totalPrice ,setTotalPrice] = useState(0)
  // const [totalQuantity,setTotalQuantity] = useState(0)
  const {totalPrice,totalQuantity} = useGlobalContext()
  const [openCartSection,setOpenCartSection] = useState(false)

  console.log("cartitemdata",cartItem)

  const redirectToLoginPage = ()=>{
    navigate("/login");

  }

  const handleCloseUserMenu =  ()=>{
    setopenUserMenu(false)
  }

  const handleMobileUser = ()=>{
    if(!user._id){
      navigate("/login");
      return;

    }

    navigate("/user")

  }


  // total Item and total price
  // useEffect(()=>{
  //   const qty = cartItem.reduce((preve,curr)=>{
  //        return preve + curr.quantity
  //   },0)

  //   setTotalQuantity(qty)

    

  //   const totalPrice = cartItem.reduce((preve,curr)=>{
  //     return preve + curr.productId.price * curr.quantity
  //   },0)

  //   setTotalPrice(totalPrice)

  // },[cartItem])


  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex  flex-col justify-center gap-1 bg-white w-full'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>
          {/** logo */}
    
          <div className='h-full'>
          <Link to={"/"} className='h-full bg-red-500 flex justify-center items'>
            <img src = {Grocery} width={80} height={100} alt='logo' className='hidden lg:block'/>
            <img src = {Grocery} width={60} height={100} alt='logo' className='lg:hidden'/>
    
          </Link>
          </div>
    
    
          {/** search */}
          <div className='hidden lg:block'>
            <Search/>
    
          </div>
    
          {/** login and my cart */}
    
          <div>
            {/** this user icon is display only in mobile version */}
            <button  className='text-neutral-500 lg:hidden' onClick={handleMobileUser}>
            <FaRegCircleUser size = {25}/>
            </button>



            {/** Desktop part */}
    
           <div className='hidden lg:flex items-center gap-10'>

            {

              user?._id ? (
                <div className='relative' > 
                  <div onClick = {()=>setopenUserMenu(preve => !preve)}className='flex select-none items-center gap-2 cursor-pointer'> 

                    <p>Account</p>
                    {
                      openUserMenu ? (
                         <GoTriangleUp size = {25}/> 

                      ) : (
                         
                        <GoTriangleDown size = {25}/>

                      )
                    }
   
                  </div>

                  {
                    openUserMenu && (
                       <div className='absolute right-0 top-12'>
                    <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                      <UserMenu close={handleCloseUserMenu}/>
                      </div>
                    </div>

                    )
                  }

                 
                </div>

              ) : (

                <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>

              )
            }
            <button onClick = {()=>setOpenCartSection(true)}className='flex items-center gap-2 bg-secondary-200 hover:bg-green-800 px-3 py-2 rounded text-white'>
              {/** add to cart icons */}

              <div className='animate-bounce'>
                <FaShoppingCart size = {26}/>

              </div>



              <div className='font-semibold text-sm'>


              <div>
                {
                  cartItem[0]?(
                    <div>
                      <p>{totalQuantity} Items</p>
                      <p>{DisplayPriceInRupee(totalPrice)}</p>
                      
                      
                       </div>
                  ) : (
                     <p> My cart </p>
                  )
                }
              
              </div>
              </div>
            </button>
    
           </div>
          </div>
          </div>

        )
      }
     

      <div className='container mx-auto px-2 lg:hidden'>
        <Search/>
      </div>



      {
        openCartSection && (
          <DisplayCartItem close={()=>setOpenCartSection(false)}/>
        )
      }
     

    </header>
  )
}

export default Header
