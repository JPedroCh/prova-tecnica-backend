import { Controller } from '..';
import { BadRequestError } from '../../../errors/bad-request';
import {
  NewsNotFoundToUpdateError,
  UpdateNewsServerError,
} from '../../../errors/news/update';
import { NotFoundError } from '../../../errors/not-found';
import {
  badRequest,
  HttpResponse,
  notFound,
  serverError,
  successfuRequest,
} from '../../../shared/http';
import NewsTypeormRepository from '../../repositories/news/news-typeorm-repository';
import { UpdateNewsService } from '../../services/news';
import { UpdateNewsDTO } from '../../validators';
type Model =
  | Error
  | {
      message: string;
    };

export class UpdateNewsController extends Controller {
  constructor(private readonly updateNews: UpdateNewsService) {
    super();
  }

  async perform(httpRequest: UpdateNewsDTO): Promise<HttpResponse<Model>> {
    const news = httpRequest;
    const response = await this.updateNews.execute(news);

    if (response.isSuccess && response.data) {
      return successfuRequest(response.data);
    } else {
      if (response.error instanceof UpdateNewsServerError) {
        return badRequest(new BadRequestError(response?.error.message));
      } else if (response.error instanceof NewsNotFoundToUpdateError) {
        return notFound(new NotFoundError(response?.error.message));
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
