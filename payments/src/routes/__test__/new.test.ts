import { OrderStatus } from '@geocodertickets/common'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/Order'
import { stripe } from '../../stripe'
import { Payment } from '../../models/Payment'


// jest.mock('../../stripe')

it('returns a 404 when purchasing an order that does not exist',async()=>{
  await request(app).post('/api/payments').set('Cookie',global.signin()).send({
    token: 'snfngng',
    orderId: new mongoose.Types.ObjectId().toHexString()
  }).expect(404)
})




it('returns a 401 when purchasing an order that does not belong to the user',async()=>{
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    version: 0,
    price: 50
  })

  await order.save()


  await request(app).post('/api/payments').set('Cookie',global.signin()).send({
    token: 'snfngng',
    orderId: order.id
  }).expect(401)
})




it('returns a 400 when purchasing an order that is cancelled',async()=>{
  const userId = new mongoose.Types.ObjectId().toHexString()

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    status: OrderStatus.Cancelled,
    version: 0,
    price: 50
  })

  await order.save()


  await request(app).post('/api/payments').set('Cookie',global.signin(userId)).send({
    token: 'snfngng',
    orderId: order.id
  }).expect(400)

})




it('returns 204 with valid inputs',async()=>{
  const userId = new mongoose.Types.ObjectId().toHexString()
  const price = Math.floor(Math.random() * 100000)

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price,
    status: OrderStatus.Created
  })

  await order.save()

  await request(app).post('/api/payments').set('Cookie',global.signin(userId)).send({
    token: 'tok_visa',
    orderId: order.id,
  }).expect(201)


  const stripeChargesList = await stripe.charges.list({limit: 50})


  const stripeCharge = stripeChargesList.data.find((charge)=>{
    return charge.amount === price * 100
  })




  expect(stripeCharge).toBeDefined()
  expect(stripeCharge!.currency).toEqual('usd')



  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id
  })


  expect(payment).not.toBeNull()
  
  
  // Tests for a mocked version of stripe.

  // const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0]

  // console.log(chargeOptions,'charges')


  // expect(chargeOptions.source).toEqual('tok_visa')
  // expect(chargeOptions.amount).toEqual(50 *100)

  // expect(chargeOptions.currency).toEqual('usd')
})


