import express from 'express'
import ObjModel from '../models/obj';


export class ObjController{
  addOne = (req: express.Request, res: express.Response) => {
    let objectAddress = req.body.objectAddress;
    let area = req.body.area;
    let roomNumber = req.body.roomNumber;
    let objectType = req.body.objectType;
    let rooms = req.body.rooms;
    let doors = req.body.doors;
    let client = req.body.client;

    ObjModel.find({}, (err, objs) => {
      let id = 0;
      if(objs){
        objs.forEach(obj => {
          if(obj.id > id) id = obj.id;
        });
        id++;
      }
      ObjModel.collection.insertOne({"id": id, 'objectAddress': objectAddress, 'area': area, 'roomNumber': roomNumber,
      'objectType': objectType, 'rooms': rooms, 'doors': doors, 'client': client}, (err, obj) => {
        if(err) console.log(err)
        else res.json({'msg': 'success'})
      });
    })
  }

  getAll = (req: express.Request, res: express.Response) => {
    ObjModel.find({}, (err, objs) => {
      if(err) console.log(err)
      else res.json(objs);
    });
  }

  modifyObject = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    let objectAddress = req.body.objectAddress;
    let area = req.body.area;
    let roomNumber = req.body.roomNumber;
    let objectType = req.body.objectType;
    let rooms = req.body.rooms;
    let doors = req.body.doors;


    ObjModel.updateOne({'id': id}, {$set: {'area': area, 'roomNumber': roomNumber,
    'objectType': objectType, 'rooms': rooms, 'doors': doors, 'objectAddress': objectAddress}}, (err, obj) => {
      if(err) console.log(err)
      else {
        res.json({'msg': 'success'})
      }
    });
  }

  deleteOne = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    ObjModel.deleteOne({'id': id}, (err, obj) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }
}