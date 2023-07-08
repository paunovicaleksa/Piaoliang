import express from 'express'
import ClientModel from '../models/client'

/* multer and nodemailer stuff */
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

const checkImageSize = (req: express.Request, res: express.Response, next) => {
  const {file} = req;
  const sharp = require('sharp');

  sharp(file.path).metadata().then((metadata) => {
    if(metadata.width >= 100 && metadata.width <= 300 && metadata.height >= 100 && metadata.height <= 300){
      next();
    } else{
      res.json({'msg': 'image must be 300x300 pixels'});
    }
  })
}

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aleksaworld2001',  
    pass: 'mbfbcekuskbobfws'   
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

export class ClientController {
  login = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    ClientModel.findOne({'username': username, 'password': password, 'type': 'client', 'status': 'approved'}, (err, client) => {
      if(err) console.log(err)
      else {
        if(client){
          const currentTime = new Date();
          const validFrom = new Date(client.validFrom);
          const validFor = client.validFor;

          if((validFor > 0)  && (currentTime.getTime() - validFrom.getTime() > validFor*60*1000)){
            res.json(null);
          } else{
            res.json(client);
          }
        } else{
          res.json(null);
        }
      };
    })
  }

  register = (req: express.Request, res: express.Response) => {
    /* no idea how else do this so this is the only way, at least it works lol */
    upload.single('image')(req, res, (err: any) => {
      let username = req.body.username;
      let password = req.body.password;
      let type = req.body.type;
      let email = req.body.email;
      let phoneNumber = req.body.phoneNumber;
      let name = req.body.firstName;
      let lastName = req.body.lastName;    
      let profilePicture = "";

      if(req.file) profilePicture = req.file.filename;
      else profilePicture = "default.png";

      checkImageSize(req, res, () => {
        ClientModel.findOne({$or: [{'username': username}, {'email': email}]}, (err, client) => {
          if(client) res.json({'msg': 'username or email already exists'});
          else {
            ClientModel.collection.insertOne({'username':         username,
                                              'password':         password,
                                              'type':             type,
                                              'email':            email,
                                              'phoneNumber':      phoneNumber,
                                              'other':            {'name': name, 'lastName': lastName, 'profilePicture': profilePicture},
                                              'validFrom':        new Date(),
                                              'validFor':         -1,
                                              'status':           'pending'
                                            }, (err, result) => {
              if(err) console.log(err)
              else res.json({'msg': 'success'});
            })
          }
        });
        });
      });
  }

  forgotten = (req: express.Request, res: express.Response) => {
    let email = req.body.email;

    ClientModel.findOne({'email': email}, (err, client) => {
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
              ClientModel.updateOne({'email': email}, {$set: {'password': password, 
              'validFrom': validFrom, 'validFor': validFor}}, (err, result) => {
                if(err) console.log(err)
                else res.json({'msg': 'success'});
              });
            }})
        }
      }
    });
  }

  getOne = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    ClientModel.findOne({'username': username}, (err, client) => {
      if(err) console.log(err);
      else res.json(client);
    });
  }

  getAll = (req: express.Request, res: express.Response) => {
    ClientModel.find({'type': 'client'}, (err, clients) => {
      if(err) console.log(err)
      else res.json(clients);
    });
  }

  changePassword = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    ClientModel.updateOne({'username': username}, {$set: {'password': password, 'validFrom': new Date(), 'validFor': -1}}, (err, result) => {
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
        ClientModel.updateOne({'username': username}, {$set: {'other.profilePicture': profilePicture}}, (err, result) => {
          if(err) console.log(err)
          else res.json({'msg': 'success'});
        });
      });
    });
  }

  setStatus = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let status = req.body.status;

    ClientModel.updateOne({'username': username}, {$set: {'status': status}}, (err, result) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    });
  }
  
  delete = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    ClientModel.deleteOne({'username': username}, (err, resp) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    });
  }

  modifyClient = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let status = req.body.status;
    let name = req.body.firstName;
    let lastName = req.body.lastName;
    let profilePictre = req.body.profilePicture;
    
    ClientModel.updateOne({'username': username}, {$set: {'password': password, 'email': email, 'status': status,
     'other.name': name, 'other.lastName': lastName, 'other.profilePicture': profilePictre}}, (err, result) => {
      if(err) console.log(err)
      else res.json({'msg': 'success'});
    });
  }
}