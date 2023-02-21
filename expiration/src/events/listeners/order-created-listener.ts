import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@geocodertickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {

  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime()

    console.log(`waiting ${delay} milliseconds to process a delay`)
      await expirationQueue.add({
        orderId: data.id
      },
      {
        delay: delay,
      }
      )

      msg.ack()
  }
}