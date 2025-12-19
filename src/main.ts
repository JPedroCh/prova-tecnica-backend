import 'reflect-metadata';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './api/routes';
import { dataSource } from './infra/database/config';

dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const port = Number(process.env.API_PORT) || 3001;
const app = express();

app.use(cors());
app.use(json());
app.use(routes);

app.listen(port, '0.0.0.0', () => console.log(`Running on port ${port}`));
