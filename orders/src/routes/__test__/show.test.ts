import mongoose from 'mongoose'
import request from 'supertest'
import {app} from '../../app'
import { Ticket } from '../../models/Ticket'


it('fetches the order',async()=>{
  // create a ticket

  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })


  await ticket.save()


  const user = global.signin()


  // make a request to build an order with this ticket

 const {body: order}= await request(app).post('/api/orders').set('Cookie',user).send({
    ticketId: ticket.id
  }).expect(201)





  // make a request to fetch the order

  const {body: fetchedOrder} = await request(app).get(`/api/orders/${order.id}`).set('Cookie',user).send().expect(200)


  expect(fetchedOrder.id).toEqual(order.id)


}


)



it('returns a not found order if it does not exist',async()=>{
  const orderId = new mongoose.Types.ObjectId().toHexString()

  const user = global.signin()
  
   await request(app).get(`/api/orders/${orderId}`).set('Cookie',user).send().expect(404)

})


it('returns an error if one user tries to fetch another users order',async()=>{
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'a concert',
    price: 200
  })


  await ticket.save()


  const user = global.signin()
  const userTwo = global.signin()

  // build an order with this ticket

  const {body: order} = await request(app).post('/api/orders').set('Cookie',user).send({ticketId: ticket.id}).expect(201)


  // then we try to get a different order as a result


  const {body: fetchedOrder} = await request(app).get(`/api/orders/${order.id}`).set('Cookie',userTwo).send().expect(401)

})