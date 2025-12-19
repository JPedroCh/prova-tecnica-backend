import { NewsRepository } from '../../repositories/news/news-repository';
import { DeleteNewsDTO } from '../../validators';
import { Service, ServiceResponse } from '../type';

export class DeleteNewsError extends Error {
  constructor() {
    super('It was not possible to delete the news.');
    this.name = 'DeleteNewsError';
  }
}

export class DeleteNewsService implements Service<{ message: string }> {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(
    newsDeleteData: DeleteNewsDTO,
  ): Promise<ServiceResponse<{ message: string }>> {
    const news = await this.newsRepository.deleteOne(newsDeleteData);

    if (news !== undefined) {
      return {
        isSuccess: true,
        data: { message: 'News deleted successfully' },
      };
    } else {
      return {
        isSuccess: false,
        error: new DeleteNewsError(),
      };
    }
  }
}
