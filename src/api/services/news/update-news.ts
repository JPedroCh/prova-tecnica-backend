import {
  NewsNotFoundToUpdateError,
  UpdateNewsServerError,
} from '../../../errors/news/update';
import { NewsRepository } from '../../repositories/news/news-repository';
import { UpdateNewsDTO } from '../../validators';
import { Service, ServiceResponse } from '../type';

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

    if (news) {
      return {
        isSuccess: true,
        data: { message: 'News updated successfully' },
      };
    }

    if (news === null) {
      return {
        isSuccess: false,
        error: new NewsNotFoundToUpdateError(),
      };
    }

    return {
      isSuccess: false,
      error: new UpdateNewsServerError(),
    };
  }
}
