import { Subjects } from "../subjects/subjects";

export interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data:{
    id: string;
    orderId: string;
    stripeId: string;

  }
}