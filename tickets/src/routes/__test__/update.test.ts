import mongoose from 'mongoose'
import request from 'supertest'
import {app} from '../../app'
import { natsWrapper } from '../../nats-wrapper'
import { Ticket } from '../../models/ticket'


it('returns a 404 if the provided id does not exist',async()=>{

    const title = 'ticket 2!!!'
    const price = 500
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`).set('Cookie',global.signin()).send({
      title,
      price
    }).expect(404)
})



it('returns a 401 if the user is not authenticated',async()=>{
  const title = 'ticket 2!!!'
    const price = 500
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`).send({
      title,
      price
    }).expect(401)
})



it('returns a 401 if the user does not own the ticket',async()=>{
  const response = await request(app).post('/api/tickets').set('Cookie',global.signin()).send({
    title: 'a new ticket',
    price: 50
  })


  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',global.signin()).send({
    title: 'abdbbf',
    price: 10000
  }).expect(401)

})



it('returns a 400 if the price and title is invalid',async()=>{
  const cookie = global.signin()
  const response = await request(app).post('/api/tickets').set('Cookie',cookie).send({
    title: 'a new ticket',
    price: 50
  })


  await  request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
    title: '',
    price: 20
  }).expect(400)


  await  request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
    title: 'title',
    price: -15
  }).expect(400)
})





it('updates the ticket if the user provides valid output',async()=>{
  const cookie = global.signin()
  const response = await request(app).post('/api/tickets').set('Cookie',cookie).send({
    title: 'a new ticket',
    price: 50
  })

  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
    title: 'an updated ticket',
    price: 200
  }).expect(200)


  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send()

  expect(ticketResponse.body.title).toEqual('an updated ticket')
  expect(ticketResponse.body.price).toEqual(200)
})


it('publishes an event',async()=>{
  const cookie = global.signin()
  const response = await request(app).post('/api/tickets').set('Cookie',cookie).send({
    title: 'a new ticket',
    price: 50
  })

  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
    title: 'an updated ticket',
    price: 200
  }).expect(200)


  expect(natsWrapper.client.publish).toHaveBeenCalled()
})


it('rejects update if the ticket is reserved',async()=>{
  const cookie = global.signin()
  const response = await request(app).post('/api/tickets').set('Cookie',cookie).send({
    title: 'a new ticket',
    price: 50
  })

  const ticket =  await Ticket.findById(response.body.id)

  ticket!.set({orderId: new mongoose.Types.ObjectId().toHexString()})

  await ticket!.save()

  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
    title: 'an updated ticket',
    price: 200
  }).expect(400)


})