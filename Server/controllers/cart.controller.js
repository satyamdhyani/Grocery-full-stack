import CartProductModel from "../models/cartproduct.model.js"
import UserModel from "../models/user.model.js"

export const addToCartItemController = async(request,response)=>{
    try{
        const userId = request.userId
        const { productId } = request.body

        if(!productId){
            return response.status(400).json({
                message : "Provide Product ID",
                error : true,
                success : false
            })
        }

        const checkItemInCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId

        })

        if(checkItemInCart){
            return response.status(400).json({
                message : "Item already in cart"
            })
        }


        const cartItem = new CartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const save = await cartItem.save()

        const updateCartUser = await UserModel.updateOne({_id : userId },{
            $push : {
                shopping_cart : productId

            }


        })


        return response.json({
            data : save,
            message : "Item added Successfully",
            error : false,
            success : true
        })

    } catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const getCartItemController = async(request,response)=>{
    try{
        const userId = request.userId

        const cartItem = await CartProductModel.find({
            userId : userId
        }).populate('productId')


        return response.json({
            data : cartItem,
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

export const updateCartItemQuantityController = async(request,response)=>{
    try{
        const userId = request.userId
        const {_id,quantity} = request.body

         console.log("id,qty controller",_id,quantity)

        if(!_id || !quantity){
            return response.status(400).json({
                message : "provide _id,qty"
            })

        }

        const updateCartItem = await CartProductModel.updateOne({
              _id : _id,
              userId : userId
        },{
            quantity : quantity
        })

        return response.json({
            message : "Item updated",
            error : false,
            success : true,
            data : updateCartItem
        })

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}



export const deleteCartItemQuantityController = async(request,response)=>{
    try{
        
        const userId = request.userId
        const {_id} = request.body

        if(!_id){
            return response.status(400).json({
                message : "Provide _id",
                error : true,
                success : false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({_id : _id ,userId : userId})

        return response.json({
            message : "Remove from cart",
            error : false,
            success : true,
            data : deleteCartItem

        })
        
       
        

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}