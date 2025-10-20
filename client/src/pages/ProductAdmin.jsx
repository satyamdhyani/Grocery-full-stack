import React,{useState,useEffect} from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearch } from "react-icons/io5";
import AxiosToastError from '../utils/AxiosToastError'

const ProductAdmin = () => {

  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const [totalPageCount,setTotalPageCount] = useState(1)
   const [loading,setLoading] = useState(false)
  const [search,setSearch] = useState("")


  const fetchProductData = async()=>{
    try{
      setLoading(true)

       const response = await Axios({
        ...SummaryApi.getproduct,
        data : {
          page : page,
          limit : 12,
          search:search

        }
       })

       const {data : responseData} = response




       console.log("Search",responseData.data)

       if(responseData.success){
        setTotalPageCount(responseData.totalNoPage)
        setProductData(responseData.data)
       }

    }catch(error){
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
     fetchProductData()
  },[page])


  const handleNext = ()=>{
    if(page !== totalPageCount){
    setPage(preve=> preve + 1)
    }


  }


  const handlePrev = ()=>{
    if(page > 1){
      setPage(preve=>preve-1)
    }
  }


const handleOnChange = (e)=>{
  const {value} = e.target

  setSearch(value)
  setPage(1)


}


useEffect(()=>{
  let flag = true

  const interval = setTimeout(()=>{
    if(flag){
      fetchProductData()
      flag = false
    }
  },300)

  return ()=>{
    clearTimeout(interval)
  }
  

},[search])

  return (
   <section>
    <div className='p-2 bg-white shadow-md flex items-center justify-between'>
      
           <h2 className='font-semibold'>Product</h2>
           <div className='h-full min-w-[26vh] w-full max-w-56 ml-auto px-2 flex items-center gap-3 bg-blue-50 border focus-within:border-primary-200'>
            <IoSearch size={25}/>
            <input
            type='text'
            placeholder='Search Product here...'
            className='h-full w-full py-2 outline-none bg-transparent '
            value={search}
            onChange={handleOnChange}
            
            />
          
       </div>


    </div>

    {
      loading && (
        <Loading/>
      )
    }


    


  <div className='p-4 bg-blue-50'>

    <div className='min-h-[55vh]'>


   <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>

    {
      productData.map((p,idx)=>{
        return(
          <div key={idx+"productadmin"}>
          <ProductCardAdmin data={p} fetchProductData={fetchProductData}/>
          </div>
        )
      })
    }

    </div>



    </div>


     

<div className='flex  justify-between my-2 p-3'>
    <button onClick={handlePrev} className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Previous</button>
    <button>{page}/{totalPageCount}</button>
    <button onClick={handleNext} className= 'border border-primary-200 px-4 py-1 hover:bg-primary-200'>Next</button>
    </div>
  </div>




    </section>


  )
}

export default ProductAdmin
