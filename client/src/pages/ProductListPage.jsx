import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { validateUrl } from '../utils/validateUrl'


const ProductListPage = () => {

  const [data,setData] = useState([])
  const [page,setPage] = useState(1)

  const[loading,setLoading] = useState(false)
  const[totalPage,setTotalPage] = useState(1)

  const params = useParams()
  const subCategorydata = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCategory,setDisplaySubCategory] = useState([])

  console.log('subCategorydata',subCategorydata)




  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0,subCategory?.length-1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]



  console.log(params)



  const fetchProductDataByCategoryAndSubCategory = async()=>{


 
    try{
      setLoading(true)
      const response =await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data : {
          categoryId : categoryId,
          subcategoryId : subCategoryId,
          page : page,
          limit : 20


        }

      })

      const {data : responseData} = response
    

      if(responseData.success){

        if(responseData.page == 1){
           setData(responseData.data)
        } else{
          setData([...data,...responseData.data])
        }
        setTotalPage(responseData.totalcount)
      }

      console.log("responsedata",responseData)

    }catch(error){
      AxiosToastError(error)

    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDataByCategoryAndSubCategory()
  },[params])


  useEffect(()=>{
    const sub = subCategorydata.filter(s=>{
      const filterData = s.category.some(el=>{
        return el._id === categoryId
      })
      return filterData ? filterData : false
    })
    setDisplaySubCategory(sub)

    console.log("sub",sub)
  },[params,subCategorydata])






  


  return (
   <section className='sticky top-24 lg:top-20'>
    <div className='container mx-auto sticky top-24 grid grid-cols-[82px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[275px,1fr]'>
      
      {/**sidebar subcategory */}
      <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll shadow-md grid gap-1 scrollbarCustom'>
        {
          DisplaySubCategory.map((s,idx)=>{
            
            const link = `/${validateUrl(s?.category[0]?.name)}-${s?.category[0]?._id}/${validateUrl(s?.name)}-${s?._id}`
            return(
              <Link to={link} className={`w-full p-2 bg-white lg:flex items-center lg:h-16 lg:gap-4
                hover:bg-green-400 cursor-pointer
               ${subCategoryId === s._id ? "bg-green-200" : ""}
               
               
               `}>
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded p-4'>
                <img
                 src={s.image}
                 alt='subcategory'
                 className='w-14 h-14 object-scale-down' 
                />
                </div>
                  <p className='-mt-2 lg:mt-0 text-xs lg:text-left lg:text-sm text-center'>{s.name}</p>


              </Link>
            )
          })
        }
        

      </div>


      {/**Product */}
      <div className='sticky top-20'>

        <div className='bg-white shadow-md p-4 z-10'>
          <h3 className='font-semibold'>{subCategoryName}</h3>
        </div>

        <div>

       <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
           <div className='grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 p-4 gap-4'>
            {
              data.map((p,idx)=>{
                return(
                  <CardProduct
                    data={p}
                    key={p._id+"productlist"+idx}

                  />
                )

                
              })
            }
          </div>
       </div>
          {
            loading && (
              <Loading/>
            )
          }
        </div>

      </div>

    </div>
   </section>
  )
}

export default ProductListPage
