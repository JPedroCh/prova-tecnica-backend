import { Controller } from '..';
import { BadRequestError } from '../../../errors/bad-request';
import {
  badRequest,
  HttpResponse,
  serverError,
  successfuRequest,
} from '../../../shared/http';
import NewsTypeormRepository from '../../repositories/news/news-typeorm-repository';
import {
  UpdateNewsData,
  UpdateNewsError,
  UpdateNewsService,
} from '../../services/news';
type Model =
  | Error
  | {
      message: string;
    };

export class UpdateNewsController extends Controller {
  constructor(private readonly updateNews: UpdateNewsService) {
    super();
  }

  async perform(httpRequest: UpdateNewsData): Promise<HttpResponse<Model>> {
    const news = httpRequest;
    const response = await this.updateNews.execute(news);

    if (response.isSuccess && response.data) {
      return successfuRequest(response.data);
    } else {
      if (response.error instanceof UpdateNewsError) {
        return badRequest(new BadRequestError(response.error.message));
      } else return serverError(response.error);
    }
  }
}

export const updateNews = () => {
  const newsRepository = new NewsTypeormRepository();
  return new UpdateNewsService(newsRepository);
};

export const makeUpdateNewsController = () => {
  return new UpdateNewsController(updateNews());
};
