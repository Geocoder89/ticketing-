import request from  'supertest'

import { app } from '../../app'




it('fails when a email that does not exist is supplied',async()=>{
  await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'password'
  }).expect(400)
})



it('fails when a email that does not exist is supplied',async()=>{
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password'
  }).expect(201)

  await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'passwordssss'
  }).expect(400)
})



it('expects a cookie when valid credentials are given',async()=>{
  const response = await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password'
  }).expect(201)

  await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'password'
  }).expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})




