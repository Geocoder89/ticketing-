
import { natsWrapper } from './nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener'
// mongoose start up code in which code to actually start our node app is nested in


const startApp = async ()=>{
  if(!process.env.NATS_CLIENT_ID){
    throw new Error('NATS_CLIENT_ID must be defined')
  }


  if(!process.env.NATS_URL){
    throw new Error('NATS_URL must be defined')
  }


  if(!process.env.NATS_CLUSTER_ID){
    throw new Error('NATS_CLUSTER_ID must be defined')
  }


  

    // trying to connect nats client using a nats singleton Object instance

    await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL)
    natsWrapper.client.on('close',()=>{
      console.log('NATS connection closed!')
      process.exit()
    })



    process.on('SIGINT',()=>natsWrapper.client.close())
    process.on('SIGTERM',()=>natsWrapper.client.close())

    

    // instance of the listener

    new OrderCreatedListener(natsWrapper.client).listen()

    // we set up our connection to look at the one set up in our kubernetes deployment

  }
startApp()

