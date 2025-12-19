import { NewsRepository } from '../../repositories/news/news-repository';
import { UpdateNewsDTO } from '../../validators';
import { Service, ServiceResponse } from '../type';

export class UpdateNewsError extends Error {
  constructor() {
    super('It was not possible to update the news.');
    this.name = 'UpdateNewsError';
  }
}

export class UpdateNewsService implements Service<{ message: string }> {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(
    newsUpdate: UpdateNewsDTO,
  ): Promise<ServiceResponse<{ message: string }>> {
    const toUpdateData = {
      ...newsUpdate,
      title: newsUpdate.titulo,
      description: newsUpdate.descricao,
    };

    const news = await this.newsRepository.updateOne({
      ...toUpdateData,
    });

    if (news !== undefined) {
      return {
        isSuccess: true,
        data: { message: 'News updated successfully' },
      };
    } else {
      return {
        isSuccess: false,
        error: new UpdateNewsError(),
      };
    }
  }
}
