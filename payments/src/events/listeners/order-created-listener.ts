import { Listener,OrderCreatedEvent,OrderStatus,Subjects } from "@geocodertickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/Order";



export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
      // create the order

      const order = Order.build({
        id: data.id,
        price: data.ticket.price,
        status: data.status,
        userId: data.userId,
        version: data.version
      })

      // save this order
      await order.save()

      // acknowledge the message

      msg.ack()
  }
}