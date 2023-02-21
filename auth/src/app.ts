import express, { Request, Response } from 'express'
import 'express-async-errors'

import cookieSession from 'cookie-session'
import {errorHandler} from '@geocodertickets/common'
import { currentUserRouter  } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { NotFoundError } from '@geocodertickets/common'


const app = express()
app.set('trust proxy', true) // express is aware of ingress nginx to trust traffic from that proxy 
app.use(express.json())
app.use(cookieSession({
  signed: false, // this disables encryption and leave that security to json web token
  secure: process.env.NODE_ENV !== 'test' // this makes sure requests are only done via https when it is not in a test environment but in the event it is... secure flag is set to true.
}))


// route configuration

// auth routers
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signupRouter)

// for routes not specified return a not found error
app.all('*',async()=>{
  throw new NotFoundError()
})





// error handling wire up

app.use(errorHandler)


export {app}