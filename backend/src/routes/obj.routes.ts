import express from 'express'
import { ObjController } from '../controllers/obj.controller';
import e from 'express';

const objRouter = express.Router();

objRouter.route('/addOne').post(
    (req, res)=>new ObjController().addOne(req, res)
)

objRouter.route('/getAll').get(
    (req, res)=>new ObjController().getAll(req, res)
)

objRouter.route('/modifyObject').post(
    (req, res)=>new ObjController().modifyObject(req, res)
)

objRouter.route('/deleteOne').post(
    (req, res)=>new ObjController().deleteOne(req, res)
)

export default objRouter;