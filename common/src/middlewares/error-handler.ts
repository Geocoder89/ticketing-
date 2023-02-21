import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";


// we pass 4 arguments into the handler....which must include the error class 
export const errorHandler = (err: Error,req: Request,res: Response,next: NextFunction)=> {



  // if the error is an instance of the base custom error class
  if (err instanceof CustomError) {

    
    // we return the status code of that error and we seek to serialize the error
    return res.status(err.statusCode).send({
      status: false, 
      errors: err.serializeErrors()
    })
  }


  console.error(err)

  
 

  //  else we return a generic error response with a 400 status code.
  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong'
      }
    ]
  })

}
