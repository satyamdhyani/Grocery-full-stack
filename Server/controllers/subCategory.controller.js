import { response } from "express"
import SubCategoryModel from "../models/subcategory.model.js"

export const Addsubcategorycontroller = async(request,response)=>{
    try{
        const {name,image,category} = request.body

        if(!name && !image && !category[0]){
            return response.status(400).json({
                message :"Provide name image and category",
                error  : true,
                success : false
            })


        }


        const payload={
            name,
            image,
            category
        }

        const createsubcategory = new SubCategoryModel(payload)
        const save = await createsubcategory.save()

        return response.json({
            message  : "Sub Category Created",
            data : save,
            error : false,
            success : true
        })

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false

        })
    }

}



export const getSubcategorycontroller = async(request,response)=>{
    try{
        const data = await SubCategoryModel.find().sort({createdAt:-1}).populate('category')
        return response.json({
            message : "Sub Category data",
            data : data,
            error : false,
            success : true
        })

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const updateSubcategorycontroller = async(request,response)=>{
    try{
        const {_id,name,image,category} = request.body

        const checkSub = await SubCategoryModel.findById(_id)

        if(!checkSub){
            return response.status(400).json({
                message : "Check your _id",
                error : true,
                success : false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category
        })

        return response.json({
            message : "Updated Successfully",
            data : updateSubCategory,
            error : false,
            success : true
        })


    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const deleteSubCategorycontroller = async(request,response)=>{
    try{
        const {_id} = request.body

        const deletesubcategory = await SubCategoryModel.findByIdAndDelete(_id)

        return response.json({
            message : "Deleted successfully",
            data : deletesubcategory,
            success : true,
            error : false
        })

    }catch(error){
        return response.status(500).json({
            message : error.message  || error,
            error : true,
            success : false
        })
    }
}