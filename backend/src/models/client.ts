import { Decimal128 } from "mongodb";
import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Client = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  other: {
    name:{
      type: String
    },
    lastName: {
      type: String
    },
    profilePicture: {
      type: String
    }
  },
  validFrom: { 
    type: Date
  },
  validFor:{
    type: Number 
  },
}, {strict: false})

export default mongoose.model('ClientModel', Client, 'users');