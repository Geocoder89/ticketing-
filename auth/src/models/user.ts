import mongoose from 'mongoose'
import {PasswordHash} from '../helpers/password-hashing'
// interface that describes the properties required to create a new user

 interface UserAttrs {
  email: string;
  password: string
 }


//   an interface that describes the properties that a user model should have with a build function to create a user object which satisfies the conditions with typescript safety

interface UserModel extends mongoose.Model <UserDocument> {
  build(attrs: UserAttrs): UserDocument
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
},
// transforming the document to JSON using the mongoose to JSON version via the transform function, the parameters taken are the document and return
{
  toJSON: {
    transform(doc,ret) {
      // this remaps the id property

      ret.id = ret._id
      delete ret._id

      // removing the password and version key properties
      delete ret.password // this removes the password property from the returned user object 
      delete ret.__v // this removes the __v password property from mongoose.
    }
  }
})

// save method on the schema to save the hash password generated
userSchema.pre('save', async function(done) {
  // if by any case the password is modified we rehash the password.
  if (this.isModified('password')){
    const hashed = await PasswordHash.toHash(this.get('password'))
    this.set('password',hashed)
  }

  // this is called after the asynchronous handling to create the password
  done();
})

// this is the build static method used to create a new user,it is a function that takes in attributes as type UserAttrs and returns a new User,this is done for typescript safety while using mongoose
userSchema.statics.build = (attrs: UserAttrs)=> {
  return new User(attrs)
}


// an interface that describes the properties that a user document has


interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

// we then return the user model
const User = mongoose.model<UserDocument,UserModel>('User',userSchema)


export { User}