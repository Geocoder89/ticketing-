import { Publisher,OrderCreatedEvent,Subjects } from "@geocodertickets/common"


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}