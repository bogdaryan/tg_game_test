import 'reflect-metadata';
import express from 'express';
import rootRouter from './routes';
import helmet from 'helmet';
import AppDataSource from '../ormconfig';

const app = express();

app.use(helmet());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Database cocnneted!');

    app.use(rootRouter(AppDataSource));

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => console.log(error));
