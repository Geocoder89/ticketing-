import mongoose from 'mongoose'
import { app } from './app'

// mongoose start up code in which code to actually start our node app is nested in


const startApp = async ()=>{

  console.log('starting up')
  // to check if the JWT key must be defined...if not 
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  // we also seek to check if the mongo uri has been defined if not we throw an error.
  if(!process.env.MONGO_URI) {
    throw new Error("MONGO URI must be defined")
  }

  try {
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

