import { NewsRepository } from '../../repositories/news/news-repository';
import { CreateNewsDTO } from '../../validators';
import { Service, ServiceResponse } from '../type';

export class CreateNewsError extends Error {
  constructor() {
    super('It was not possible to create news');
    this.name = 'CreateNewsError';
  }
}

export class CreateNewsService implements Service<{
  title: string;
  description: string;
}> {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(
    createNewsData: CreateNewsDTO,
  ): Promise<ServiceResponse<{ title: string; description: string }>> {
    const news = await this.newsRepository.createNews({
      titulo: createNewsData.titulo,
      descricao: createNewsData.descricao,
    });

    if (news !== undefined) {
      return {
        isSuccess: true,
        data: { title: news.titulo, description: news.descricao },
      };
    } else {
      return {
        isSuccess: false,
        error: new CreateNewsError(),
      };
    }
  }
}
