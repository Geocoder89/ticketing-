import { Subjects } from "../subjects/subjects";


export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number
    ticket: {
      id: string;
    }
  }
}