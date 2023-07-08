import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Obj = new Schema({
  id:{
    type: Number
  },
  objectAddress: {
    type: String
  },
  area: {
    type: Number
  },
  roomNumber: {
    type: Number
  },
  objectType: {
    type: String
  },
  rooms: {
    type: Array< { x: number, y: number, width: number, height: number, background: string }>
  }, 
  doors: { 
    type: Array< { x: number, y: number, width: number, height: number }>
  },
  client: {
    type: String
  }
})

export default mongoose.model('ObjModel', Obj, 'objs');