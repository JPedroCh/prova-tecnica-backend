import { Controller } from '..';
import { BadRequestError } from '../../../errors/bad-request';
import {
  badRequest,
  HttpResponse,
  serverError,
  successfuRequest,
} from '../../../shared/http';
import NewsTypeormRepository from '../../repositories/news/news-typeorm-repository';
import { ListNewsError, ListNewsService, News } from '../../services/news';

type Model = Error | News[];

export class ListNewsController extends Controller {
  constructor(private readonly listNews: ListNewsService) {
    super();
  }

  async perform(): Promise<HttpResponse<Model>> {
    const response = await this.listNews.execute();
    if (response.isSuccess && response.data) {
      return successfuRequest(response.data);
    } else {
      if (response.error instanceof ListNewsError) {
        return badRequest(new BadRequestError(response.error.message));
      } else return serverError(response.error);
    }
  }
}

export const listNews = () => {
  const newsRepository = new NewsTypeormRepository();
  return new ListNewsService(newsRepository);
};

export const makeListNewsController = () => {
  return new ListNewsController(listNews());
};
