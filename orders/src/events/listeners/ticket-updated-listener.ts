import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
} from "@geocodertickets/common";
import { Ticket } from "../../models/Ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const foundTicket = await Ticket.findByEventVersion(data)
    if (!foundTicket) {
      throw new Error("Ticket not found");
    }

    const { title, price } = data;
    foundTicket.set({ title, price });

    await foundTicket.save();

    msg.ack();
  }
}
