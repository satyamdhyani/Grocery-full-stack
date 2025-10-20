import {Router} from 'express'
import { Addsubcategorycontroller, deleteSubCategorycontroller, getSubcategorycontroller, updateSubcategorycontroller } from '../controllers/subCategory.controller.js'
import auth from '../Middleware/Auth.js'


const subcategoryRouter = Router()


subcategoryRouter.post('/create',auth,Addsubcategorycontroller)
subcategoryRouter.post('/get',getSubcategorycontroller)
subcategoryRouter.put('/update',auth,updateSubcategorycontroller)
subcategoryRouter.delete('/delete',auth,deleteSubCategorycontroller)

export default subcategoryRouter