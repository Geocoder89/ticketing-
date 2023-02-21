
import {scrypt, randomBytes} from 'crypto'
import {promisify} from 'util'

// this makes the sycrypt library to work with promises
const scrpytAsync = promisify(scrypt)
export class PasswordHash {
  // a to hash method which takes in a password as a string
  static async toHash(password: string){
    // generate a salt
    const salt = randomBytes(8).toString('hex')
    // hash the salt and then convert it to a buffer
    const buffer = (await scrpytAsync(password,salt,64)) as Buffer


    // we then return a concantenated value consisting of the salt and the hash delimited by a "."
    return `${buffer.toString('hex')}.${salt}`
  }


  // compare method used to compare a stored password in the db with the password supplied/provided
  static async compare(storedPassword: string,suppliedPassword: string) {
    // we split the password stored by the "." delimiter and destructuring it into an array
    const [hashedPassword,salt ] = storedPassword.split('.')
    // we then seek to convert the supplied result to hash and then turn  it to a buffer
    const buffer = (await scrpytAsync(suppliedPassword,salt,64)) as Buffer

    // we then seek to provide a positive value if when converted back to a hex string it matches the hashed/stored password in the db
    return buffer.toString('hex') === hashedPassword
  }
}