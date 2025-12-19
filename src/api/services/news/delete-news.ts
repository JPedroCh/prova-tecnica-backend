import {
  DeleteNewsServerError,
  NewsNotFoundToDeleteError,
} from '../../../errors/news/delete';
import { NewsRepository } from '../../repositories/news/news-repository';
import { DeleteNewsDTO } from '../../validators';
import { Service, ServiceResponse } from '../type';

export class DeleteNewsService implements Service<{ message: string }> {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(
    newsDeleteData: DeleteNewsDTO,
  ): Promise<ServiceResponse<{ message: string }>> {
    const news = await this.newsRepository.deleteOne(newsDeleteData);

    if (news) {
      return {
        isSuccess: true,
        data: { message: 'News deleted successfully' },
      };
    }

    if (news === null) {
      return {
        isSuccess: false,
        error: new NewsNotFoundToDeleteError(),
      };
    }

    return {
      isSuccess: false,
      error: new DeleteNewsServerError(),
    };
  }
}
