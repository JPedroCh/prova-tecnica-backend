import { Controller } from '..';
import { BadRequestError } from '../../../errors/bad-request';
import {
  badRequest,
  HttpResponse,
  serverError,
  successfuRequest,
} from '../../../shared/http';
import NewsTypeormRepository from '../../repositories/news/news-typeorm-repository';
import { CreateNewsService } from '../../services/news';

type HttpRequest = {
  titulo: string;
  descricao: string;
};

type Model =
  | Error
  | {
      title: string;
      description: string;
    };

export const createNews = () => {
  const newsRepository = new NewsTypeormRepository();
  return new CreateNewsService(newsRepository);
};

export class CreateNewsController extends Controller {
  constructor(private readonly createNews: CreateNewsService) {
    super();
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.createNews.execute(params);
    if (response.isSuccess && response.data)
      return successfuRequest(response.data);

    if (response.error)
      return badRequest(new BadRequestError(response.error.message));

    return serverError(response.error);
  }
}

export const makeCreateNewsController = () => {
  return new CreateNewsController(createNews());
};
