import express, {Request,Response} from 'express'
import { body } from 'express-validator'
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher'
import { natsWrapper } from '../nats-wrapper'

import {
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
  BadRequestError
} from '@geocodertickets/common'

import { Ticket } from '../models/ticket'


const router = express.Router()


router.put('/api/tickets/:id',requireAuth,
[
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({gt: 0}).withMessage('Price must be provided and must be greater than 0')
],
validateRequest,
async(req: Request,res: Response)=>{
  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) {
    throw new NotFoundError()
  }

  // if the user id of the owner of the ticket does not match the logged the user
  if(ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }

  if(ticket.orderId) {
    throw new BadRequestError('cannot edit a reserved ticket.')
  }

  // set tickets on the documents in memory but not in the db
  ticket.set({
    title: req.body.title,
    price: req.body.price
  })

  // ticket now saved in the database
  await ticket.save()

  // publish an event indicating that the ticket has been successfully updated
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version
  })

  // the ticket gets returned.
  res.send(ticket)
})



export {router as updateTicketRouter}