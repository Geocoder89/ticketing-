import {ValidationError} from 'express-validator'
import { CustomError } from './custom-error'


export class RequestValidationError extends CustomError {

  statusCode = 400
 
  constructor(public errors: ValidationError[]) {
    super('invalid request parameters')

    // to extend a built in class in typescript 
    Object.setPrototypeOf(this,RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(err=>{
      return {
        message: err.msg,
        field: err.param
      }
    })
  }
} 