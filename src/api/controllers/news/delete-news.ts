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
  DeleteNewsData,
  DeleteNewsError,
  DeleteNewsService,
} from '../../services/news';

type Model =
  | Error
  | {
      message: string;
    };

export class DeleteNewsController extends Controller {
  constructor(private readonly deleteNews: DeleteNewsService) {
    super();
  }

  async perform(httpRequest: DeleteNewsData): Promise<HttpResponse<Model>> {
    const news = httpRequest;
    const response = await this.deleteNews.execute(news);

    if (response.isSuccess && response.data) {
      return successfuRequest(response.data);
    } else {
      if (response.error instanceof DeleteNewsError) {
        return badRequest(new BadRequestError(response.error.message));
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
