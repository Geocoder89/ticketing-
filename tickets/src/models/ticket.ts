import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

//  this defines the properties required to build a single ticket document on mongodb using mongoose
interface TicketAttrs {
  title: string,
  price: number;
  userId: string;
}

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}


interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}


const ticketSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
  }
},{
  toJSON: {
    transform(doc,ret){
      ret.id = ret._id;

      delete ret._id
    }
  }
})

// using the mongoose update if current....we edit the version key to be "version" instead of the __v
ticketSchema.set('versionKey','version')

// using the plugin from the mongoose update if current 
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttrs)=>{
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket',ticketSchema);


export {Ticket}