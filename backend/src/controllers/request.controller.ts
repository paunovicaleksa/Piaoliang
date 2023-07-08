import express from 'express'
import RequestModel from '../models/request';

export class RequestController{
  getAll = (req: express.Request, res: express.Response) => {
    RequestModel.find({}, (err, requests) => {
      if(err) console.log(err)
      else res.json(requests);
    });
  }

  addOne = (req: express.Request, res: express.Response) => {
    let status = "pending";
    let type = req.body.type;
    let other = req.body.other;

    RequestModel.find({}, (err, requests) => {
      let id = 0;
      if(requests){
        requests.forEach(request => {
          if(request.id > id) id = request.id;
        });
        id++;
      }
      RequestModel.collection.insertOne({"id": id, 'type': type, 'status': status, 'other': other}, (err, request) => {
        if(err) console.log(err)
        else res.json({'msg': 'success'})
      });
    });
  }

  reject = (req: express.Request, res: express.Response) => {
    let id = req.body.id;

    RequestModel.updateOne({'id': id}, {'status': 'rejected'}, (err, request) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }

  accept = (req: express.Request, res: express.Response) => {
    let id = req.body.id;

    RequestModel.updateOne({'id': id}, {'status': 'accepted'}, (err, request) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }
}