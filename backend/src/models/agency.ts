import { Decimal128 } from "mongodb";
import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Agency = new Schema({
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
    name: {
      type: String
    },
    address: {
      type: String
    },
    agencyNumber: {
      type: Number
    },
    description: {
      type: String
    },
    profilePicture: {
      type: String
    },
    ratings: {
      type: Array
    },
    vacancies: {
      type: Number
    }
  },
  validFrom: { 
    type: Date
  },
  validFor:{
    type: Number 
  }
}, {strict: false});

export default mongoose.model('AgencyModel', Agency, 'users');