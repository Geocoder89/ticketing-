import { Subjects,Publisher,PaymentCreatedEvent } from "@geocodertickets/common";



export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}