import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Worker = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  specialization: {
    type: String
  },
  agency: {
    type: String
  },
  //i think this will be useful later
  job: {
    type: Number
  }
})

export default mongoose.model('WorkerModel', Worker, 'workers');