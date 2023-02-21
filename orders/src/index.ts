import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'
import { TicketCreatedListener } from './events/listeners/ticket-created-listener'
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener'
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener'
import { PaymentCreatedListener } from './events/listeners/payment-created-listener'
ExpirationCompleteListener
// mongoose start up code in which code to actually start our node app is nested in


const startApp = async ()=>{

  console.log('starting!!!....')
  // to check if the JWT key must be defined...if not 
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI must be defined')
  }

  if(!process.env.NATS_CLIENT_ID){
    throw new Error('NATS_CLIENT_ID must be defined')
  }


  if(!process.env.NATS_URL){
    throw new Error('NATS_URL must be defined')
  }


  if(!process.env.NATS_CLUSTER_ID){
    throw new Error('NATS_CLUSTER_ID must be defined')
  }


  try {

    // trying to connect nats client using a nats singleton Object instance

    await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL)
    natsWrapper.client.on('close',()=>{
      console.log('NATS connection closed!')
      process.exit()
    })

    process.on('SIGINT',()=>natsWrapper.client.close())
    process.on('SIGTERM',()=>natsWrapper.client.close())
    // ticket listener set up

    new TicketCreatedListener(natsWrapper.client).listen()
    new TicketUpdatedListener(natsWrapper.client).listen()

  // expiration listener


  new ExpirationCompleteListener(natsWrapper.client).listen()


  // payment listener

  new PaymentCreatedListener(natsWrapper.client).listen()

    // we set up our connection to look at the one set up in our kubernetes deployment
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to database')
  } catch (error) {
    console.error(error)
  }
  // code to listen on traffic to port specified.
  app.listen(3000,()=>{
    console.log('listening on port 3000')
  })
}


startApp()

