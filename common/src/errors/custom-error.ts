

// the custom error class which is the class that all other error classes glean or extend from extends from the default Error javascript class
export abstract class CustomError extends Error {

  // properties that must be implement in the customError class
  abstract statusCode: number

  // definition of the constructor which takes in the message property. we must define the super keyword to explain that the class stating here is extending from a parent.
  constructor(message: string) {
    super(message)
    // typescript annotation which creates the custom error class
    Object.setPrototypeOf(this,CustomError.prototype)
  }

  //  serialize errors methods which makes sure errors comes back as an array of objects having a message as a compulsory property, and an optional field property which are both strings.
  abstract serializeErrors(): {
    message: string;
    field?: string
  }[]
}


