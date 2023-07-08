import express from 'express'
import AdminModel from '../models/admin';

export class AdminController {
  login = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    AdminModel.findOne({'username': username, 'password': password, 'type': 'admin'}, (err, admin) => {
      if(err) console.log(err)
      else {
        if(admin){
          const currentTime = new Date();
          const validFrom = new Date(admin.validFrom);
          const validFor = admin.validFor;
          
          if((validFor > 0)  && (currentTime.getTime() - validFrom.getTime() > validFor*60*1000)){
            console.log("invalid");
            res.json(null);
          } else{
            console.log("valid");
            res.json(admin);
          }
        } else{
          res.json(null);
        }
      }
    });
  }

  getOne = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    AdminModel.findOne({'username': username}, (err, admin) => {
      if(err) console.log(err)
      else res.json(admin);
    });
  }
}