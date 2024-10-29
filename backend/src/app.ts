import 'reflect-metadata';
import express from 'express';
import rootRouter from './routes';
import helmet from 'helmet';
import AppDataSource from '../ormconfig';
import cors from 'cors';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
3;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(rootRouter(AppDataSource));

app.listen(process.env.PORT || 3002);
