import express from 'express';
import 'dotenv/config';
import authenticationRouter from './routers/authentiacation';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TodoDB', { 
    useCreateIndex: true,
    useNewUrlParser: true 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

authenticationRouter(router);
app.use('/api/v1/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})