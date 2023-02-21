import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/Order'
import { Ticket } from '../../models/Ticket'


// Helper function to create tickets

const buildTicket = async()=>{
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })

  await ticket.save()

  return ticket
}

it('returns all orders for a particular user',async()=>{
  // create three tickets and save them into the database. we create it directly from ticket model

  const ticketOne = await buildTicket()
  const ticketTwo = await buildTicket()
  const ticketThree = await buildTicket()

  const userOne = global.signin() // user one sign in
  const userTwo = global.signin() // user Two sign in

// Create one order as user #1

await request(app).post('/api/orders').set('Cookie',userOne).send({ticketId: ticketOne.id}).expect(201)


// create two orders as User #2

const {body: orderOne} = await request(app).post('/api/orders').set('Cookie',userTwo).send({ticketId: ticketTwo.id}).expect(201)
const {body: orderTwo} = await request(app).post('/api/orders').set('Cookie',userTwo).send({ticketId: ticketThree.id}).expect(201)


// Make request to get orders for User #2

const response = await request(app).get('/api/orders').set('Cookie',userTwo).expect(200)

// Make sure we only got orders for User #2.

expect(response.body.length).toEqual(2)
expect(response.body[0].id).toEqual(orderOne.id)
expect(response.body[1].id).toEqual(orderTwo.id)
expect(response.body[0].ticket.id).toEqual(ticketTwo.id)
expect(response.body[1].ticket.id).toEqual(ticketThree.id)



})