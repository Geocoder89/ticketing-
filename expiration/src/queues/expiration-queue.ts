import  Queue from "bull";
import { ExpirationCompleteEventPublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

// interface to determine data to store in job


interface bullPayload {
  orderId: string;
}
// we create a new instance of a queue from bull
const expirationQueue = new Queue<bullPayload>('order:expiration',{
  redis: {
    host: process.env.REDIS_HOST
  }
})


expirationQueue.process(async(job)=>{
  new ExpirationCompleteEventPublisher(natsWrapper.client).publish({
    orderId: job.data.orderId
  })
})


export {expirationQueue}