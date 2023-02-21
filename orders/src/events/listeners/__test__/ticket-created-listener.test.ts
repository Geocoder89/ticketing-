import { TicketCreatedListener } from "../ticket-created-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { TicketCreatedEvent } from "@geocodertickets/common"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"
import { Ticket } from "../../../models/Ticket"

const setup = async()=>{
 // creates an instance of the listener.

const listener = new TicketCreatedListener(natsWrapper.client)
  // creates a fake data event

  const data: TicketCreatedEvent['data'] ={
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'a concert',
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString()
  }



  // creates a fake message object

  // @ts-ignore
  const message: Message = {
   ack: jest.fn()
  }


  return {
    listener,data,message
  }
  
}



it('creates and saves a ticket',async()=>{
 
  const {listener,data,message} = await setup()
  // calls the onMessage function with the data object + message object

  await listener.onMessage(data,message)
  
  // write assertions to make sure a ticket was created.
  const ticket = await Ticket.findById(data.id)

  expect(ticket).toBeDefined()
  expect(ticket!.title).toEqual(data.title)
  expect(ticket!.price).toEqual(data.price)

})


it('acknowledges the message',async()=>{

  const {listener,data,message} = await setup()

  // calls the onMessage function with the data object + message object

  await listener.onMessage(data,message)

  // write assertions to make sure ack function was called
  expect(message.ack).toHaveBeenCalled()
})