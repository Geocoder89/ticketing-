import { response } from 'express'
import request from 'supertest'

import { app } from '../../app'


it('returns a 201 on successful sign up',async()=>{
  return request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password'
  }).expect(201)
})

it('returns a 400 with an invalid email',async()=>{
  return request(app).post('/api/users/signup').send({
    email: 'ababdbrud',
    password: 'password'
  }).expect(400)
})


it('returns a 400 with an invalid password',async()=>{
  return request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'p'
  }).expect(400)
})



it('returns a 400 with missing email and password ',async()=>{
  return request(app).post('/api/users/signup').send({}).expect(400)
})


it('returns a 400 with either a missing email or password', async()=>{

  // first check to see if email is missing and password is present we use the await keyword to chain multiple test blocks and then we use the return keyword to run the final test block.

    await request(app).post('/api/users/signup').send({
      // email: '',
      password: 'password'
    }).expect(400)

    return request(app).post('/api/users/signup').send({
      // email: 'test@test.com',
      password: ''
    }).expect(400)
})


it('does not allow duplicate emails',async()=>{
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password'
  }).expect(201)

  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password'
  }).expect(400)
})


it('sets a cookie after successful sign up',async()=>{
    const response =  await request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    }).expect(201)


    expect(response.get('Set-Cookie')).toBeDefined()
    
  
})