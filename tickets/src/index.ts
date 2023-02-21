import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener'
import { OrderCreatedListener } from './events/listeners/order-created-listener'

// mongoose start up code in which code to actually start our node app is nested in


const startApp = async ()=>{

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

        // ne instances of the order both cancelled and created event listeners

        new OrderCreatedListener(natsWrapper.client).listen()
        new OrderCancelledListener(natsWrapper.client).listen()

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
