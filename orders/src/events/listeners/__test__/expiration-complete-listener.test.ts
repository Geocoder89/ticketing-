import { natsWrapper } from "../../../nats-wrapper"
import { ExpirationCompleteListener } from "../expiration-complete-listener"
import { Order } from "../../../models/Order"
import { Ticket } from "../../../models/Ticket"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"
import { ExpirationCompleteEvent,OrderStatus } from "@geocodertickets/common"
const setUp =  async()=>{

  // create an instance of listener
  const listener = new ExpirationCompleteListener(natsWrapper.client)

  // create a ticket

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })


  await ticket.save()


  // create an order
  const order = Order.build({
     status: OrderStatus.Created,
     userId: 'abdbdbf',
     expiresAt: new Date(),
     ticket,
  })

  await order.save()



  // create an event

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id
  }


  // @ts-ignore

  const message: Message = {
    ack: jest.fn()
  }


  return {listener,order,ticket,data,message}
}



it('updates the order status to cancelled',async()=>{
  const {listener,order,ticket,data,message} = await setUp()

  await listener.onMessage(data,message)

  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})


it('emit an order cancelled event',async()=>{
  const {listener,order,ticket,data,message} = await setUp()

  await listener.onMessage(data,message)

expect(natsWrapper.client.publish).toHaveBeenCalled()


const eventData = JSON.parse(
  (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
);

 console.log(eventData,'this is the event data')

expect (eventData.id).toEqual(order.id)
})



it('acknowledges the message',async()=>{
  const {listener,data,message} = await setUp()

  await listener.onMessage(data,message)


  expect(message.ack).toHaveBeenCalled()

})