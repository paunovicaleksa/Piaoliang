import express from 'express'
import { WorkerController } from '../controllers/worker.controller';

const workerRouter = express.Router();

workerRouter.route('/addOne').post(
    (req, res)=>new WorkerController().addOne(req, res)
)

workerRouter.route('/getAll').get(
    (req, res)=>new WorkerController().getAll(req, res)
)

workerRouter.route('/assignJob').post(
    (req, res)=>new WorkerController().assignJob(req, res)
)

workerRouter.route('/delete').post(
    (req, res)=>new WorkerController().delete(req, res)
)

workerRouter.route('/modifyWorker').post(
    (req, res)=>new WorkerController().modifyWorker(req, res)
)

export default workerRouter;