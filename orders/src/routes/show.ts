import express,{Request,Response,NextFunction} from 'express'
import { NotAuthorizedError, NotFoundError, requireAuth } from '@geocodertickets/common'
import { Order } from '../models/Order'

const router = express.Router()


router.get('/api/orders/:orderId',requireAuth,async(req:Request,res: Response)=>{
  const order = await Order.findById(req.params.orderId).populate('ticket')

  // if the order is not found,we throw a new not found user error
  if(!order) {
    throw new NotFoundError()
  }

  // check if the user id of the order does not match the logged in user id,throw a not authorized error
  if(order.userId !== req.currentUser!.id){
    throw new NotAuthorizedError()
  }

  // if found return the specific order
  res.send(order)
})


export {router as showOrderRouter}