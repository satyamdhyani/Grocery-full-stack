import { Router } from 'express'
import auth from '../Middleware/Auth.js'
import { createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../Middleware/Admin.js'

const productRouter = Router()

productRouter.post('/create',auth,admin,createProductController)
productRouter.post('/get',getProductController)
productRouter.post('/get-product-by-category',getProductByCategory)
productRouter.post('/get-product-by-category-and-subcategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details',getProductDetails)
productRouter.put('/update-product-details',auth,admin,updateProductDetails)
productRouter.delete('/delete-product',auth,admin,deleteProductDetails)
productRouter.post('/search-product',searchProduct)
export default productRouter