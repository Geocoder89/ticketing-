import request from 'supertest';
import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'



let mongo: any



declare global {
  var signin: () => Promise<string[]>;
}
// mongo memory server set up

// before all hook starts before our tests begin to run
beforeAll(async()=>{
 mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri,{})
})



// before each of our test runs we delete initial copies

beforeEach(async()=>{

  process.env.JWT_KEY="Geocoder@89"
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


global.signin = async () =>{
  const email = 'test@test.com';
  const password = 'password'


  const response = await request(app).post('/api/users/signup').send({
    email,
    password
  }).expect(201)

  const cookie = response.get('Set-Cookie')
  return cookie
}


