import { Subjects } from "../subjects/subjects";


export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete
  data: {
    orderId: string;
  }
}