import { Router } from 'express';
import {
  makeCreateNewsController,
  makeDeleteNewsController,
  makeListNewsController,
  makeUpdateNewsController,
} from '../controllers/news';
import { adaptExpressRoute } from '../adapters/express-router';
import { validate } from '../../shared/zod-middleware';
import {
  createNewsSchema,
  deleteNewsSchema,
  listNewsSchema,
  updateNewsSchema,
} from '../validators';

const routes = Router();

routes.post(
  '/create',
  validate(createNewsSchema),
  adaptExpressRoute(makeCreateNewsController()),
);
routes.get(
  '/list',
  validate(listNewsSchema),
  adaptExpressRoute(makeListNewsController()),
);
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
