import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'

console.clear()
// creating a client


const client = nats.connect('ticketing','abc',{
  url: 'http://localhost:4222'
})

// wait for the client to connect via a call back

client.on('connect',async()=>{
  console.log('Publisher connected to nats')



  // refactor


  const publisher = new TicketCreatedPublisher(client)


  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20
    })
  
  } catch (error) {
    console.log(error,'this is the error')
  }
 

  // we wrap it

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // })







  // // code used to publish the event,the first argument is the name or subject of event,the second argument is the "event or message" and the third argument is a callback which does a particular thing after the event has been called e.g a console.log to indicate that the event has been published
  // client.publish('ticket:created',data, ()=>{
  //   console.log('Event published.')
  // })



  
  






})