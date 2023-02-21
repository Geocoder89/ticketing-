import request from 'supertest';
import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { json } from 'express';



let mongo: any



declare global {
  var signin: () => string[];
}


// this allows us make us have a mock implementation of our nats test
jest.mock('../nats-wrapper')
// mongo memory server set up

// before all hook starts before our tests begin to run
beforeAll(async()=>{
 mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri,{})
})



// before each of our test runs we delete initial copies




beforeEach(async()=>{

  // we clear all mocks
jest.clearAllMocks()
  process.env.JWT_KEY="Geocoder@89";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
 const collections = await mongoose.connection.db.collections()

 for(let collection of collections) {
  await collection.deleteMany({})
 }
})


// after al we end all mongoose and mongodb connections



afterAll(async()=>{
  if(mongo) {
    await mongo.stop()
  }

  await mongoose.connection.close()
})




global.signin = () =>{

  // generate random id used to sign into the request
  // Build a JWT payload. {id,email}


  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }

  // Create the JWT!

  const token =  jwt.sign(payload,process.env.JWT_KEY!)
  //  Build a session a key of jwt with a value of JWT


  const session = {
    jwt: token
  }
  // Turn the session into JSON

  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64

  const base64  = Buffer.from(sessionJSON).toString('base64')


  //  return a string that's the cookie with the encoded data

  return [`session=${base64}`];
}


