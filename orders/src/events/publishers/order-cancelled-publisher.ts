import { Publisher,OrderCancelledEvent,Subjects } from "@geocodertickets/common";



export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}