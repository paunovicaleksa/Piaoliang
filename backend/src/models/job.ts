import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Job = new Schema({
  id: {
    type: Number
  },
  price: {
    type: Number
  },
  paid: {
    type: Boolean
  },
  status: {
    type: String
  },
  agency: {
    type: String
  }, 
  client: {
    type: String
  },
  object: {
    type: Number
  }
})

export default mongoose.model('JobModel', Job, 'jobs');