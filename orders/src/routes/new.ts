import express,{Request,Response,NextFunction} from 'express'
import mongoose from 'mongoose'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth,validateRequest } from '@geocodertickets/common'
import { body } from 'express-validator'
import { Order } from '../models/Order'
import { Ticket } from '../models/Ticket'
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'
const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 5 * 60


router.post('/api/orders',requireAuth,[
  body('ticketId').not().isEmpty()
  // check if the ticket id is a valid mongo id
  .custom((input: string)=> mongoose.Types.ObjectId.isValid(input))
  .withMessage('TicketId must be provided.')
],validateRequest,async(req:Request,res: Response)=>{


  // pull of the ticket id from the body of incoming request
  const {ticketId} = req.body

  // Find the ticket the user is trying to order in the database

  const ticket = await Ticket.findById(ticketId)

  if(!ticket) {
    throw new NotFoundError()
  }

  // Make sure that the ticket is not already reserved.
  const  isReserved = await ticket.isReserved()

  if(isReserved) {
    throw new BadRequestError('Ticket has already been reserved')
  }


  // Calculate an expiration date for that order if it fails the ticket returns to a cancelled order.

  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)


  // Create the order and save it to the database

  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket

  })

  await order.save()


  // Publish an order being created to relevant services in the app via events.
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    version: order.version,
    userId: order.userId,
    expiresAt: order.expiresAt.toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
    
  })
  res.status(201).send(order)


})


export {router as createOrderRouter}