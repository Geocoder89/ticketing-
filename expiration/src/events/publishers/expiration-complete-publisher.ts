import { Subjects,Publisher,ExpirationCompleteEvent } from "@geocodertickets/common";


export class ExpirationCompleteEventPublisher extends Publisher<ExpirationCompleteEvent>{
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  
}