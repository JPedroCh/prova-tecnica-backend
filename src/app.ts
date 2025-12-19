import 'reflect-metadata';
import express, { json } from 'express';
import cors from 'cors';
import routes from './api/routes';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

export { app };
