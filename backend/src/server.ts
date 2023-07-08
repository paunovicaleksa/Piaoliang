import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import clientRouter from './routes/client.routes';
import agency from './models/agency';
import { AgencyController } from './controllers/agency.controller';
import agencyRouter from './routes/agency.routes';
import workerRouter from './routes/worker.routes';
import objRouter from './routes/obj.routes';
import jobRouter from './routes/job.routes';
import adminRouter from './routes/admin.routes';
import { request } from 'http';
import requestRouter from './routes/request.routes';
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(express.json())

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/piaoliang')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();

router.use('/client', clientRouter);
router.use('/agency', agencyRouter);
router.use('/worker', workerRouter);
router.use('/object', objRouter);
router.use('/job', jobRouter);
router.use('/admin', adminRouter);
router.use('/request', requestRouter);

app.use('/', router)
app.use('/uploads', express.static('uploads'));
app.listen(4000, () => console.log(`Express server running on port 4000`));