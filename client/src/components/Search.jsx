import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)
    
    useEffect(()=>{
           const isSearch = location.pathname === "/search"
           setIsSearchPage(isSearch);


    },[location])

 



    const redirectToSearchPage = ()=>{
        navigate("/search");
        
    }


    const handleOnChange = (e)=>{
        const value = e.target.value

        const url = `/search?q=${value}`
        navigate(url)

    }

    return (
        <div className='w-full bg-red-500 min-w-[300px] lg:min-w-[420px] h-11 lg: h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
           <div>
          


            {
                (isMobile && isSearchPage) ? (
                    
            <Link to = {"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
            <FaArrowAltCircleLeft size = {20}/>
            </Link>
                    
                ) : (
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                    <FaSearch size={22} />
                </button>

                )
            }



            </div>

            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        // not in search page

                        <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>

                        <TypeAnimation
                            sequence={[
                                'Search "milk"', // Types 'One'
                                1000, // Waits 1s
                                'Search "bread"', // Deletes 'One' and types 'Two'
                                1000, // Waits 2s
                                'Search "sugar"', // Types 'Three' without deleting 'Two'
                                1000,
                                'Search "paneer"',
                                1000,
                                'Search "chocolate"',
                                1000,
                                'Search "curd"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "egg"',
                                1000,
                                'Search "chips"',
                                1000,
        
        
                                () => {
                                    console.log('Sequence completed');
                                },
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                          
                        />
                    </div>
                    ) : (
                        // when i was in search page

                        <div className='w-full h-full'>
                            <input type = "text" placeholder='search for atta daal and more' autoFocus className='bg-transparent w-full h-full outline-none'
                            defaultValue={searchText}
                            onChange={handleOnChange}/> 
                            </div>
                    )
                }
            </div>



          


        </div>
    )
}

export default Search
