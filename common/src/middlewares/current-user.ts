import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//  an interface declaring what the jwt verify function should return
interface UserPayload {
  id: string;
  email: string;
}

// declaring the current user on the request interface on express
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if there is no req.session or req.session.jwt we move to the next middleware
  if (!req.session?.jwt) {
   return next();
  }

  // we then try to verify the token and if it matches we store the current user as the verified payload returned
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  // in the absence of any error the current user is attached and the next middleware if any is fired
  next();
};
