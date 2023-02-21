import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener"
import { Ticket } from "../../../models/ticket"
import mongoose from "mongoose"
import { OrderCancelledEvent } from "@geocodertickets/common"
import { Message } from "node-nats-streaming"

const setup = async ()=>{

  // listener to listen for cancelled order
  const listener = new OrderCancelledListener(natsWrapper.client)

  const orderId = new mongoose.Types.ObjectId().toHexString()

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'asdf',
  })

  ticket.set({orderId})

  await ticket.save()


  // fake data event


  const data: OrderCancelledEvent['data'] ={
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id
    }
  }

  // mock a message


  //@ts-ignore
  const message: Message = {
    ack: jest.fn()
  }


  return {listener,ticket,data,message,orderId}
}



it('updates the ticket to cancelled',async()=>{
  const {listener,ticket,data,message,orderId} = await setup()

  // we key into the on message function of listener

  await listener.onMessage(data,message)


  // check for the updated ticket id
  const updatedTicket = await Ticket.findById(ticket.id)


  console.log(updatedTicket,'this is the updated ticket')

  expect(updatedTicket!.orderId).not.toBeDefined()
})


it ('publishes an update event',async()=>{
  const {listener,ticket,data,message,orderId} = await setup()

  await listener.onMessage(data,message)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})




it ('publishes an update event',async()=>{
  const {listener,ticket,data,message,orderId} = await setup()

  await listener.onMessage(data,message)

  expect(message.ack).toHaveBeenCalled()
})




