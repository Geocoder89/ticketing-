
import mongoose from 'mongoose'
import { Order,OrderStatus } from './Order';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}


export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc

  // abstracted method which carries out the versioning for us,it takes in an id and version which are a string and number and returns a promise which is either of a ticket doc type or null if the event is not found
  findByEventVersion(event:{id: string,version: number}): Promise<TicketDoc | null>
}


const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0

  }
},{
  toJSON: {
    transform(doc,ret) {
      ret.id = ret._id

      delete ret._id
    }
  }
})

ticketSchema.set('versionKey','version')
ticketSchema.plugin(updateIfCurrentPlugin)


ticketSchema.statics.build = (attrs: TicketAttrs)=>{
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price
  })
}


ticketSchema.statics.findByEventVersion = (event: {id: string,version: number})=>{
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1
  })
}

//  run a query to look at all orders. find an order where the ticket is the ticket we found and the order status is not cancelled,if we find an order from that,that means the ticket is reserved
ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we called isReserved.

  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  })

  return !!existingOrder
}

const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket',ticketSchema)


export {Ticket}
