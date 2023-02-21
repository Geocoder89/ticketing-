import nats from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { type } from 'os'
import { TicketCreatedListener } from './events/ticket-created-listener'
console.clear()

const client = nats.connect('ticketing',randomBytes(4).toString('hex'),{
  url: 'http://localhost:4222'
})


client.on('connect',()=>{
  console.log('listening on nats')




  client.on('close',()=>{
    console.log('Nats connection closed!')
    process.exit()
  })

  new TicketCreatedListener(client).listen()


  // const options = client.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setDurableName('ticketing-service')
  // const subscription = client.subscribe(
  //   'ticket:created',
  //   'orders-service-queue-group',
  // options)

  // subscription.on('message',(msg: Message)=>{
  //   const data = msg.getData()


  //   if(typeof data === 'string') {
  //     console.log(`Received event #${msg.getSequence()} with data: ${data}`)
  //   }
  //   msg.ack()
  // })
})


process.on('SIGINT',()=> client.close())
process.on('SIGTERM',()=> client.close())





