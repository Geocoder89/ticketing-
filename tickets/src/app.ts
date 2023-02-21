import express from 'express'
import 'express-async-errors'
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'
import { indexTicketRouter } from './routes'
import { updateTicketRouter } from './routes/update'
import cookieSession from 'cookie-session'
import {errorHandler,NotFoundError,currentUser} from '@geocodertickets/common'




const app = express()
app.set('trust proxy', true) // express is aware of ingress nginx to trust traffic from that proxy 
app.use(express.json())
app.use(cookieSession({
  signed: false, // this disables encryption and leave that security to json web token
  secure: process.env.NODE_ENV !== 'test' // this makes sure requests are only done via https when it is not in a test environment but in the event it is... secure flag is set to true.
}))



// to use the middleware to check for the current user,it must come after the cookie session

app.use(currentUser)


// route configuration

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

// for routes not specified return a not found error
app.all('*',async(req,res)=>{
  throw new NotFoundError()
})





// error handling wire up

app.use(errorHandler)


export {app}