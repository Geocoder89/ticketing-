import { Request,Response,NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";


export const validateRequest = (req: Request,res: Response, next: NextFunction)=>{
  // we seek to validate the request parameters entered.
  const errors = validationResult(req)

  // if the errors are not empty...i.e if there are errors we throw a request validation errors and return the array of errors.
  if(!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  // in the absence of errors the next routing middleware is invoked.
  next()
}
