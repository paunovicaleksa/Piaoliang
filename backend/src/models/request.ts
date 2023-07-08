import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Request = new Schema({
  id: {
    type: Number
  },
  status: {
    type: String
  },
  type: {
    type: String
  },
  other: {
    type: Object
  }
})

export default mongoose.model('RequestModel', Request, 'requests');