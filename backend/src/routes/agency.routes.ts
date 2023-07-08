import express from 'express'
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/login').post(
    (req, res)=>new AgencyController().login(req, res)
)

agencyRouter.route('/register').post(
    (req, res)=>new AgencyController().register(req, res)
)

agencyRouter.route('/forgotten').post(
    (req, res)=>new AgencyController().forgotten(req, res)
)

agencyRouter.route('/getAll').get(
    (req, res)=>new AgencyController().getAll(req, res)
)

agencyRouter.route('/getOne').post(
    (req, res)=>new AgencyController().getOne(req, res)
)

agencyRouter.route('/changePassword').post(
    (req, res)=>new AgencyController().changePassword(req, res)
)

agencyRouter.route('/changeImage').post(
    (req, res)=>new AgencyController().changeImage(req, res)
)

agencyRouter.route('/addRating').post(
    (req, res)=>new AgencyController().addRating(req, res)
)

agencyRouter.route('/addVacancies').post(
    (req, res)=>new AgencyController().addVacancies(req, res)
)

agencyRouter.route('/setStatus').post(
    (req, res)=>new AgencyController().setStatus(req, res)
)

agencyRouter.route('/delete').post(
    (req, res)=>new AgencyController().delete(req, res)
)

agencyRouter.route('/modifyAgency').post(
    (req, res)=>new AgencyController().modifyAgency(req, res)
)

export default agencyRouter;