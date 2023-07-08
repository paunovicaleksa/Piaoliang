import express from 'express'
import JobModel from '../models/job';

export class JobController {
  getAll = (req: express.Request, res: express.Response) => {
    JobModel.find({}, (err, jobs) => {
      if(err) console.log(err)
      else res.json(jobs);
    });
  }

  addOne = (req: express.Request, res: express.Response) => {
    let client = req.body.client;
    let agency = req.body.agency;
    let object = req.body.object;

    JobModel.find({}, (err, jobs) => {
      let id = 0;
      if(jobs){
        jobs.forEach(job => {
          if(job.id > id) id = job.id;
        });
        id++;
      }
      JobModel.collection.insertOne({"id": id, 'client': client, 'agency': agency, 'object': object,
         'paid': false,'price': null ,'status': 'request'}, (err, job) => {
        if(err) console.log(err)
        else res.json({'msg': 'success'})
      });
    });
  }

  updateOne = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    let status = req.body.status;
    let paid = req.body.paid;
    let price = req.body.price;

    JobModel.updateOne({'id': id}, {'status': status, 'paid': paid, 'price': price}, (err, job) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }

  deleteOne = (req: express.Request, res: express.Response) => {
    let id = req.body.id;

    JobModel.deleteOne({'id': id}, (err, job) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }
}

