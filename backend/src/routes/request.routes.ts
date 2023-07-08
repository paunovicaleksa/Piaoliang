import express from 'express'
import { RequestController } from '../controllers/request.controller';

const requestRouter = express.Router();

requestRouter.route('/addOne').post(
    (req, res)=>new RequestController().addOne(req, res)
)

requestRouter.route('/getAll').get(
    (req, res)=>new RequestController().getAll(req, res)
)

requestRouter.route('/reject').post(
    (req, res)=>new RequestController().reject(req, res)
)

requestRouter.route('/accept').post(
    (req, res)=>new RequestController().accept(req, res)
)

export default requestRouter;