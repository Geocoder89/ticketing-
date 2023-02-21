import express, { Request, Response } from 'express'
import { body} from 'express-validator'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'
import {BadRequestError,validateRequest} from '@geocodertickets/common'
import { PasswordHash } from '../helpers/password-hashing'

const router = express.Router()



router.post('/api/users/signin',[
  body('email').isEmail().withMessage('Email must be valid'), //check if there is an email
  body('password').trim().notEmpty().withMessage('You must supply a password') // if the password is trimmed and checked if it is not empty
],
validateRequest,
async (req: Request,res: Response)=>{

  // check if there is an existing email and if password entered matches the existing password in the db
 const {email,password} = req.body
 const existingUser = await User.findOne({email})

//  if there is none and error is thrown.
 if(!existingUser) {
  throw new BadRequestError('Invalid credentials')
 }


//  if there is the password is checked to see if there is a match with the one stored in db by using the passowrd compare helper function/method.
 const matchPassword = await PasswordHash.compare(existingUser.password,password)


//  if the password does not match an invalid password error is shown.
 if(!matchPassword) {
  throw new BadRequestError('Invalid Credentials')
 }


 // if there is a match, generate web token 

 const userJwt = jwt.sign({
  id: existingUser.id,
  email: existingUser.email
},
process.env.JWT_KEY!

)


// store it in a session

req.session = {
  jwt: userJwt
}
// return the user as a response value
res.status(200).send(existingUser)


})


export {router as signInRouter}