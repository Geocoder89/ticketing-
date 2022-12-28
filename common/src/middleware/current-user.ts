import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'


//  an interface declaring what the jwt verify function should return
interface UserPayload {
  id: string;
  email: string;
}





// declaring the current user on the request interface on express
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}


const currentUser = (req: Request,res: Response,next: NextFunction)=>{

  // if there is no req.session or req.session.jwt we move to the next middleware
    if(!req.session?.jwt) {
      next()
    }

    try {
      //  this checks or verify if the json web token matches by checking if the jwt stored in the session is a valid token 
      const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as UserPayload

      // this is then assigned to the current user which was created to the verified payload and attach it to the request
      req.currentUser = payload
    } catch (error) {
      console.log('this is the error',error)
    }

    // in the absence of any error the current user is attached and the next middleware if any is fired 
    next()
}

export default currentUser