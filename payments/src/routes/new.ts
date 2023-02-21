import express, {Request,Response } from "express";
import { body } from "express-validator";
import { requireAuth,validateRequest,BadRequestError,NotFoundError, NotAuthorizedError, OrderStatus } from "@geocodertickets/common";
import { Order } from "../models/Order";
import { stripe } from "../stripe";
import { Payment } from "../models/Payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router()


router.post('/api/payments',requireAuth,validateRequest,[
  body('token').not().isEmpty().withMessage('Token is required'),
  body('orderId').not().isEmpty().withMessage('Order id is required.')
],
async (req: Request,res: Response)=>{

  const {token,orderId} = req.body

  // find the order
  const order = await Order.findById(orderId)

  // if not found we throw a not found error
  if(!order) {
    throw new NotFoundError()
  }


  // if the user id of the order does not match the current user id,throw an error
  if(order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }

  // if the status is cancelled.
  if(order.status === OrderStatus.Cancelled) {
    throw new BadRequestError('Cannot pay for a cancelled Order')
  }

  // if all passes

       
  const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token
    })

  
    const payment = Payment.build({
      orderId,
      stripeId: charge.id
    })


    await payment.save()


    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id:payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId

    })

    // console.log(process.env.STRIPE_KEY!,'this is the stripe secret')
    res.status(201).send({payment})

})


export {router as createChargeRouter}