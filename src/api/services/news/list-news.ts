import { NewsRepository } from '../../repositories/news/news-repository';
import { ListNewsDTO } from '../../validators';
import { Service, ServiceResponse } from '../type';

export class ListNewsError extends Error {
  constructor() {
    super('It was not possible to list the news!');
    this.name = 'GetNewsError';
  }
}

export interface News {
  title: string;
  description: string;
}

export class ListNewsService implements Service<News[]> {
  constructor(private readonly newsRepository: NewsRepository) {}
  async execute(listNewsData: ListNewsDTO): Promise<ServiceResponse<News[]>> {
    let newsFound = null;

    newsFound = await this.newsRepository.listAll({
      ...listNewsData,
      page:
        listNewsData.page !== undefined ? Number(listNewsData.page) : undefined,
      limit:
        listNewsData.limit !== undefined
          ? Number(listNewsData.limit)
          : undefined,
    });

    if (newsFound) {
      const returnedValue = (
        newsFound instanceof Array ? newsFound : [newsFound]
      ) as News[];
      return { isSuccess: true, data: returnedValue };
    }
    return {
      isSuccess: false,
      error: new ListNewsError(),
    };
  }
}
