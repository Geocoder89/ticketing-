import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order, OrderStatus } from '../../models/Order'
import { Ticket } from '../../models/Ticket'
import { natsWrapper } from '../../nats-wrapper'



it('marks an order as cancelled',async()=>{
  // create a ticket with the Ticket Model

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })

  await ticket.save()

  const user = global.signin()
  // make a request to create an order

  const {body: order} = await request(app).post('/api/orders').set('Cookie',user).send({
    ticketId: ticket.id
  }).expect(201)

  // make a request to cancel the order

  await request(app).delete(`/api/orders/${order.id}`).set('Cookie',user).send().expect(204)

  // expectation to confirm ticket is cancelled

  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('emits an order cancelled event',async()=>{
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })

  await ticket.save()

  const user = global.signin()
  // make a request to create an order

  const {body: order} = await request(app).post('/api/orders').set('Cookie',user).send({
    ticketId: ticket.id
  }).expect(201)

  // make a request to cancel the order

  await request(app).delete(`/api/orders/${order.id}`).set('Cookie',user).send().expect(204)


  expect(natsWrapper.client.publish).toHaveBeenCalled()
})