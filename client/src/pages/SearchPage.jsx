import React, { useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import { useEffect } from 'react'
 import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom'
import noData from '../assets/nothing here yet.webp'

const SearchPage = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)


  const fetchData = async()=>{
    try{
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data : {
          search : searchText,
          page : page
        }
      })

      const {data : responseData} = response

      if(responseData.success){
        if(responseData.page == 1){
          setData(responseData.data)
        }else{
          setData((preve)=>{
            return[
              ...preve,
              ...responseData.data
            ]
          })
        }

        setTotalPage(responseData.totalPage)
      }

    }catch(error){
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }

  }

  useEffect(()=>{
    fetchData()
  },[page,searchText])


  const handlefetchMore = ()=>{
    if(totalPage > page){
      setPage(preve => preve + 1)
    }
  }




  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-bold'>Search Results: {data.length}</p>

        
      </div>

      <InfiniteScroll 
          dataLength={data.length}
          hasMore={true}
          next={handlefetchMore}
      
      
      >

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-5 gap-4'>

        {
          data.map((p,idx)=>{
            return(
              <CardProduct data={p} key={p?._id+"search"+idx}/>
            )
          })
        }


      





        {/**Loading data */}

        {
          loading && (
            loadingArrayCard.map((_,idx)=>{
              return(
                <CardLoading key={"loading"+idx}/>
              )
            })

          )
        }
      </div>

      </InfiniteScroll>


        {
          !data[0] && !loading && (
            <div className='flex flex-col justify-center items-center mx-auto '>
              <img
              src={noData}
              className='h-full w-full max-w-sm max-h-sm block'
              
              
             
              
              />
              <p className='font-semibold my-2'>No Data Found</p>
              </div>
          )
        }




    </section>
  )
}

export default SearchPage
