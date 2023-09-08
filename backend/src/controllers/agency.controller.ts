import express from 'express'
import AgencyModel from '../models/agency';
import { resolve } from 'path';

const multer = require('multer');

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + "_" + file.originalname);
        }
});

const upload = multer({
  storage: storage
});
/* no idea what i am doing lol */
const checkImageSize = (req: express.Request, res: express.Response, next) => {
  const {file} = req;
  const sharp = require('sharp');
  if(!file) next()
  else{
    sharp(file.path).metadata().then((metadata) => {
      if(metadata.width >= 100 && metadata.width <= 300 && metadata.height >= 100 && metadata.height <= 300){
        next();
      } else{
        res.json({'msg': 'image must be 300x300 pixels'});
      }
    })
  }
}


const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  }
});

const generateRandomString = (myLength) => {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!@#$%^&*()";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

export class AgencyController {
  login = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    AgencyModel.findOne({'username': username, 'password': password, 'type': 'agency', 'status': 'approved'}, (err, agency) => {
      if(err) console.log(err)
      else {
        if(agency){
          const currentTime = new Date();
          const validFrom = new Date(agency.validFrom);
          const validFor = agency.validFor;
          
          if((validFor > 0)  && (currentTime.getTime() - validFrom.getTime() > validFor*60*1000)){
            console.log("invalid");
            res.json(null);
          } else{
            console.log("valid");
            res.json(agency);
          }
        } else{
          res.json(null);
        }
      }
    });
  }

  register = (req: express.Request, res: express.Response) => {
    console.log('we are here');

    upload.single('image')(req, res, (err) => {
      let username = req.body.username;
      let password = req.body.password;
      let phoneNumber = req.body.phoneNumber;
      let email = req.body.email;
      let type = req.body.type;
      let agencyName = req.body.agencyName;
      let address = req.body.address;
      let agencyNumber = req.body.agencyNumber;
      let description = req.body.description; 
      let profilePicture = "";

      if(req.file) profilePicture = req.file.filename;
      else profilePicture  = "default.png";

      checkImageSize(req, res, () => {
        AgencyModel.findOne({$or: [{'username': username}, {'email': email}]}, (err, agency) => {
          if(err) console.log(err)
          else {
            if(agency){
              res.json({'msg': 'username or email already exists'});
            } else {
              AgencyModel.collection.insertOne({'username':         username, 
                                                'password':         password, 
                                                'phoneNumber':      phoneNumber, 
                                                'email':            email, 
                                                'type':             type, 
                                                'other':            {'name': agencyName, 'address': address, 'agencyNumber': agencyNumber, 'description': description, 'profilePicture': profilePicture, 'vacancies': 0, 'ratings': []}, 
                                                'validFrom':        new Date(),
                                                'validFor':         -1,
                                                'status':           'pending'
                                              }, (err, result) => {
              
                if(err) console.log(err);
                else res.json({'msg': 'success'});
              });
             } 
          }
        });


      });
    });
  }
  forgotten = (req: express.Request, res: express.Response) => {
    let email = req.body.email;

    AgencyModel.findOne({'email': email}, (err, client) => {
      if(err) console.log(err)
      else {
        if(!client) res.json({'msg': 'email does not exist'});
        else {
          const password = generateRandomString(10);
          const validFrom: Date = new Date();
          const validFor: number = 10;

          const mailOptions = {
            from: 'aleksaworld2001@gmail.com',
            to: email,
            subject: 'Forgotten password',
            text: 'Your password is: ' + password
          }

          transport.sendMail(mailOptions, (err: any, info: any) => {
            if(err) console.log(err)
            else {
              AgencyModel.updateOne({'email': email}, {$set: {'password': password, 
              'validFrom': validFrom, 'validFor': validFor}}, (err, result) => {
                if(err) console.log(err)
                else res.json({'msg': 'success'});
              });
            }})
        }
      }
    });  
  }

  getAll = (req: express.Request, res: express.Response) => {
    AgencyModel.find({'type': 'agency'}, (err, agencies) => {
      if(err) console.log(err)
      else res.json(agencies);
    });
  }

  getOne = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    AgencyModel.findOne({'username': username, 'type': 'agency'}, (err, agency) => {
      if(err) console.log(err)
      else {
        res.json(agency);
      }
    });
  }

  changePassword = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    AgencyModel.updateOne({'username': username}, {$set: {'password': password, 'validFrom': new Date(), 'validFor': -1}}, (err, result) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    });
  }

  changeImage = (req: express.Request, res: express.Response) => {
    upload.single('image')(req, res, (err: any) => {
      let username = req.body.username;
      let profilePicture = "";

      if(req.file) profilePicture = req.file.filename;
      else profilePicture = "default.png";

      checkImageSize(req, res, () => {
        AgencyModel.updateOne({'username': username}, {$set: {'other.profilePicture': profilePicture}}, (err, result) => {
          if(err) console.log(err)
          else res.json({'msg': 'success'});
        });
      });
    }); 
  }

  addRating = (req: express.Request, res: express.Response) => {
    let user = req.body.user;
    let rating = req.body.rating;
    let comment = req.body.comment;
    let job = req.body.job;
    let agency = req.body.agency;

    AgencyModel.findOne({'username': agency}, (err, ag) => {
      if(err) console.log(err)
      else {
        let ratings = ag.other.ratings;
        let ratingNew = {'user': user, 'rating': rating, 'comment': comment, 'job': job};
        ratings.forEach((r: any) => {
          if(r.job === job){
            r.rating = rating;
            r.comment = comment;
            ratingNew = null;
          }
        });

        if(ratingNew) ratings.push(ratingNew);
      
        AgencyModel.updateOne({'username': agency}, {$set: {'other.ratings': ratings}}, (err, result) => {
          if(err) console.log(err)
          else res.json({'msg': 'success'});
        });
      }
    });  
  }

  addVacancies = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let vacancies = req.body.vacancies;

    AgencyModel.updateOne({'username': username}, {$set: {'other.vacancies': vacancies}}, (err, result) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    });
  }

  setStatus = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let status = req.body.status;

    AgencyModel.updateOne({'username': username}, {$set: {'status': status}}, (err, result) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    });
  }

  delete = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    AgencyModel.deleteOne({'username': username}, (err, result) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    });
  }

  modifyAgency = (req: express.Request, res: express.Response) => {

    let username = req.body.username
    let password = req.body.password
    let agencyNumber = req.body.agencyNumber
    let name = req.body.name
    let agencyAddress = req.body.agencyAddress
    let email = req.body.email
    let status = req.body.status
    let profilePicture = req.body.profilePicture
    let vacancies = req.body.vacancies
  
    AgencyModel.updateOne({'username': username}, {$set: {'password': password, 'other.agencyNumber': agencyNumber, 'other.name':
       name, 'other.address': agencyAddress, 'email': email, 'status': status, 'other.profilePicture': profilePicture, 'other.vacancies': vacancies}},
        (err, result) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    })
  }
}
