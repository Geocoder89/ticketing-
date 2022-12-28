import {Response,Request,NextFunction} from 'express'
import { NotAuthorizedError } from '../errors/unauthorized-request'

const requireAuth = (req: Request,res: Response,next: NextFunction)=> {


  // check if there is a req.currentUser value or if the value is not null,in the event it is null or empty it will throw an unauthorized error.
  if(!req.currentUser) {
    throw new NotAuthorizedError()
  }

  // if there is no error the next function is fired to go to the next route middleware.
  next()
}

export default requireAuth