import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from "../../../models/ticket"
import { OrderCreatedEvent, OrderStatus } from "@geocodertickets/common"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"

const setUp = async()=>{
  // create an instance of the listener

  const listener = new OrderCreatedListener(natsWrapper.client)


  // Create and save a ticket


  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf'
  })


  await ticket.save()
  // create the fake data event

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'asdjf',
    expiresAt: 'andnnfg',
    ticket: {
        id: ticket.id,
        price: ticket.price,
    }
  }


  //  return the message

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }


  //  return the needed values

  return {ticket,data,msg,listener}
}


it('sets the orderId of the ticket',async()=>{
  const {ticket,data,msg,listener} = await setUp()

  await listener.onMessage(data,msg) 


  //  we need to refetch the ticket because ticket has outdated data 
  const updatedTicket = await Ticket.findById(ticket.id)

  // we assert that the particular ticket has an orderId set

  expect(updatedTicket!.orderId).toEqual(data.id)

})




it('acknowledges the message using message.ack()',async()=>{
  const {ticket,data,msg,listener} = await setUp()

  await listener.onMessage(data,msg) 

  expect(msg.ack).toHaveBeenCalled()
})


it('publishes a ticket updated event', async () => {
  const {ticket,data,msg,listener} = await setUp();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});