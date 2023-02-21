import mongoose from "mongoose"
import { TicketUpdatedListener } from "../ticket-updated-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from "../../../models/Ticket"
import { Subjects, TicketUpdatedEvent } from "@geocodertickets/common"

const setup = async ()=>{
  // create a listener

  const listener = new TicketUpdatedListener(natsWrapper.client)
  

  // create and save a ticket 

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })

  await ticket.save()
  // create a fake data object

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'another concert',
    price: 30,
    userId: 'ababsbdb'
  }
  // create a fake message

  // @ts-ignore
  const message: Message ={
    ack: jest.fn()
  }

  // return all of this stuff

  return {listener,data,message,ticket}
}


it('finds,updates and save a ticket',async()=>{
  const {message,data,ticket,listener} = await setup()


  // call the on message function
  await listener.onMessage(data,message)

  // makes assertions on what is returned

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.title).toEqual(data.title)
  expect(updatedTicket!.price).toEqual(data.price)
  expect(updatedTicket!.version).toEqual(data.version)
})




it('acknowledges a ticket',async()=>{
  const {message,data,listener} = await setup()

  await listener.onMessage(data,message)

  expect(message.ack).toHaveBeenCalled()
})



it('does not call acknowledge if the event has a skipped version number',async()=>{
  const {message,data,ticket,listener} = await setup()

  data.version = 10

  try {
    await listener.onMessage(data,message)
  } catch (error) {
    
  }

  expect(message.ack).not.toHaveBeenCalled()


 
})