import express, { Request, Response } from 'express'
import {body} from 'express-validator'
import jwt from 'jsonwebtoken'
import {validateRequest} from '@geocodertickets/common'
import { BadRequestError } from '@geocodertickets/common'
import { User } from '../models/user'
const router = express.Router()



router.post('/api/users/signup',[ 
  // this is the use of express validator to check if the parameters entered are of the required type and returns errors if it is not the case
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({min:4 ,max: 20}).withMessage(
    'Password must be between 4 and 20 Characters'
  )
],
validateRequest,
async (req: Request,res: Response)=>{
  // extract the user properties
  const {email,password} = req.body

  // checks if the user exists with that specific email.
  const existingUser = await User.findOne({email})


  // if there is an existing user,throw a bad request error
  if(existingUser){
    throw new BadRequestError('Email is in use')
  }
  

  // else use the build method defined in the user schema to create a new user
  const user = User.build({email,password})

  // save the user
  await user.save()

  // generate web token 

  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  },
  process.env.JWT_KEY!
  
  )


  // store it (the json web token) in a session

  req.session = {
    jwt: userJwt
  }
  // return the user as a response value
  res.status(201).send(user)

}) 


export {router as signupRouter}