import { OrderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Order } from "../../../models/Order"
import mongoose from 'mongoose'
import { OrderStatus,OrderCancelledEvent } from "@geocodertickets/common"

const setUp = async()=>{

  const listener = new OrderCancelledListener(natsWrapper.client)

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'abffbgb',
    version: 0
  })

  await order.save()


  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'adbfb'
    }
  }

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn()
  }


  return {listener,order,data,msg}

}



it('updates the status of the order',async()=>{
  const {listener,order,data,msg} = await setUp()

  await listener.onMessage(data,msg)

  const updatedOrder = await Order.findById(order.id)


  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})




it('updates the status of the order',async()=>{
  const {listener,order,data,msg} = await setUp()

  await listener.onMessage(data,msg)

  
  expect(msg.ack).toHaveBeenCalled()
})
