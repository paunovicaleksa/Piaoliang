import express from 'express'
import { JobController } from '../controllers/job.controller';

const jobRouter = express.Router();

jobRouter.route('/addOne').post(
    (req, res)=>new JobController().addOne(req, res)
)

jobRouter.route('/getAll').get(
    (req, res)=>new JobController().getAll(req, res)
)

jobRouter.route('/updateOne').post(
    (req, res)=>new JobController().updateOne(req, res)
)

jobRouter.route('/deleteOne').post(
    (req, res)=>new JobController().deleteOne(req, res)
)

export default jobRouter;