import {Router} from 'express'
import auth from '../Middleware/Auth.js'
import { addToCartItemController, deleteCartItemQuantityController, getCartItemController, updateCartItemQuantityController } from '../controllers/cart.controller.js'

const cartRouter = Router()


cartRouter.post('/create',auth,addToCartItemController)
cartRouter.get('/get',auth,getCartItemController)
cartRouter.put('/update-qty',auth,updateCartItemQuantityController)
cartRouter.delete('/delete-cart-item',auth,deleteCartItemQuantityController)


export default cartRouter