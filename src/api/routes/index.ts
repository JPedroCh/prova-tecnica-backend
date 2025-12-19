import { Router } from 'express';
import {
  makeCreateNewsController,
  makeDeleteNewsController,
  makeListNewsController,
  makeUpdateNewsController,
} from '../controllers/news';
import { adaptExpressRoute } from '../adapters/express-router';
import { validate } from '../../shared/zod-middleware';
import { createNewsSchema } from '../validators/create-news-validator';
import { deleteNewsSchema, updateNewsSchema } from '../validators';

const routes = Router();

routes.post(
  '/create',
  validate(createNewsSchema),
  adaptExpressRoute(makeCreateNewsController()),
);
routes.get('/list', adaptExpressRoute(makeListNewsController()));
routes.put(
  '/update',
  validate(updateNewsSchema),
  adaptExpressRoute(makeUpdateNewsController()),
);
routes.delete(
  '/delete',
  validate(deleteNewsSchema),
  adaptExpressRoute(makeDeleteNewsController()),
);

export default routes;
