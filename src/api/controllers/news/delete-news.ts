import { Controller } from '..';
import { BadRequestError } from '../../../errors/bad-request';
import {
  DeleteNewsServerError,
  NewsNotFoundToDeleteError,
} from '../../../errors/news/delete';
import { NotFoundError } from '../../../errors/not-found';
import {
  badRequest,
  HttpResponse,
  notFound,
  serverError,
  successfuRequest,
} from '../../../shared/http';
import NewsTypeormRepository from '../../repositories/news/news-typeorm-repository';
import { DeleteNewsService } from '../../services/news';
import { DeleteNewsDTO } from '../../validators';

type Model =
  | Error
  | {
      message: string;
    };

export class DeleteNewsController extends Controller {
  constructor(private readonly deleteNews: DeleteNewsService) {
    super();
  }

  async perform(httpRequest: DeleteNewsDTO): Promise<HttpResponse<Model>> {
    const news = httpRequest;
    const response = await this.deleteNews.execute(news);

    if (response.isSuccess && response.data) {
      return successfuRequest(response.data);
    } else {
      if (response.error instanceof DeleteNewsServerError) {
        return badRequest(new BadRequestError(response?.error.message));
      } else if (response.error instanceof NewsNotFoundToDeleteError) {
        return notFound(new NotFoundError(response?.error.message));
      } else return serverError(response.error);
    }
  }
}

export const deleteNews = () => {
  const newsRepository = new NewsTypeormRepository();
  return new DeleteNewsService(newsRepository);
};

export const makeDeleteNewsController = () => {
  return new DeleteNewsController(deleteNews());
};
