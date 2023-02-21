import { Message } from "node-nats-streaming";
import { Subjects,Listener,TicketCreatedEvent } from "@geocodertickets/common";
import { Ticket } from "../../models/Ticket";
import { queueGroupName } from "./queue-group-name";



export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName

  async onMessage(data: TicketCreatedEvent['data'],msg: Message ) {

    // we pull out the ticket and price properties from the data gotten from the ticket created event
    const {id,title,price} = data

    // we then proceed to store these values in a local db of tickets in the orders service.
    const ticket = Ticket.build({
      id,title,price
    })

    await ticket.save()

    // we then call the ack function of the Message object of nodes nat streaming to acknowledge the event.
    msg.ack()
  }
}