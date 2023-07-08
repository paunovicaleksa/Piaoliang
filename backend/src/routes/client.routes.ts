import express from 'express'
import { ClientController } from '../controllers/client.controller';


const clientRouter = express.Router();

clientRouter.route('/login').post(
    (req, res)=>new ClientController().login(req, res)
)

clientRouter.route('/getAll').get(
    (req, res)=>new ClientController().getAll(req, res)
)

clientRouter.route('/register').post(
    (req, res)=>new ClientController().register(req, res)
)

clientRouter.route('/forgotten').post(
    (req, res)=>new ClientController().forgotten(req, res)
)

clientRouter.route('/getOne').get().post(
    (req, res)=>new ClientController().getOne(req, res)
)

clientRouter.route('/changePassword').post(
    (req, res)=>new ClientController().changePassword(req, res)
)

clientRouter.route('/changeImage').post(
    (req, res)=>new ClientController().changeImage(req, res)
)

clientRouter.route('/setStatus').post(
    (req, res)=>new ClientController().setStatus(req, res)
)

clientRouter.route('/delete').post(
    (req, res)=>new ClientController().delete(req, res)
)

clientRouter.route('/modifyClient').post(
    (req, res)=>new ClientController().modifyClient(req, res)
)

export default clientRouter;