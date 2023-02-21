import { Listener, OrderCreatedEvent, Subjects } from "@geocodertickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data:OrderCreatedEvent['data'],message: Message){

    // reach into ticket collection and find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id)

    // if no ticket,throw error

    if(!ticket) {
      throw new Error('Ticket not found')
    }

    //  Mark the ticket as being reserved by setting it's orderId property

    ticket.set({orderId: data.id})
    //  save the ticket 

    await ticket.save()

    // publish the updated event,await checks if any issue occurs in the publish,it returns an error.
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price:ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId
    })

    // ack the message.
    message.ack()
  }
}