import { Listener,OrderCancelledEvent, Subjects} from "@geocodertickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName

  async onMessage(data: OrderCancelledEvent['data'],message: Message){

    // try to find the ticket

     const ticket = await Ticket.findById(data.ticket.id)


    //   if we fail to find ticket throw error

    if(!ticket){
      throw new Error('Ticket not found')
    }


    // if found we set the orderId property of that event to undefined,using null does not work so well with typescript.
    ticket.set({orderId: undefined})

    // we save the published ticket.

    await ticket.save()

    // publish the updated ticket event.
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId
    })

    // acknowledge published ticket
  

    message.ack()
  }
}