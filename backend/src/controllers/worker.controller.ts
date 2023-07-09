import express from 'express'
import WorkerModel from '../models/worker';
import AgencyModel from '../models/agency';
import { Worker } from 'worker_threads';

export class WorkerController{
  addOne = (req: express.Request, res: express.Response) => {
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let specialization = req.body.specialization;
    let agency = req.body.agency;
    let job = -1;
    
    WorkerModel.find({}, (err, workers) => {
      let id = 0;
      if(workers){
        workers.forEach(worker => {
          if(worker.id > id) id = worker.id;
        });
        id++;
      }
      WorkerModel.find({'email': email}, (err, worker) => {
        if(err) console.log(err)
        else if(worker.length > 0) res.json({'msg': 'email'})
        else {
          WorkerModel.collection.insertOne({'id': id, 'name': name, 'lastName': lastName, 'email': email, 
          'phoneNumber': phoneNumber, 'specialization': specialization, 'agency': agency, 'job': job}, (err, worker) => {
            if(err) console.log(err)
            else {
              AgencyModel.updateOne({'username': agency}, {$inc: {'other.vacancies': -1}}, (err, agency) => {
                if(err) console.log(err);
                else res.json({'msg': 'success'})
              });
            }
          });
        }
      });
    });
  }

  getAll = (req: express.Request, res: express.Response) => {
    WorkerModel.find({}, (err, workers) => {
      if(err) console.log(err)
      else res.json(workers);
    });
  }

  assignJob = (req: express.Request, res: express.Response) => {
    let job = req.body.job;
    let id = req.body.id;

    WorkerModel.updateOne({'id': id}, {'job': job}, (err, worker) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }

  delete = (req: express.Request, res: express.Response) => {
    let id = req.body.id;

    WorkerModel.deleteOne({'id': id}, (err, worker) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }

  modifyWorker = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let specialization = req.body.specialization;
    let agency = req.body.agency;
    let job = req.body.job;

    WorkerModel.updateOne({'id': id}, {'name': name, 'lastName': lastName, 'email': email, 'phoneNumber': phoneNumber, 
    'specialization': specialization, 'agency': agency, "job": job}, (err, worker) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'})
    });
  }
}