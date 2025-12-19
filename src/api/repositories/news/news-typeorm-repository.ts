import { dataSource } from '../../../infra/database/config';
import { Noticia } from './news-entity';
import { NewsRepository } from './news-repository';

class NewsTypeormRepository implements NewsRepository {
  private readonly newsRepository;
  constructor() {
    this.newsRepository = dataSource.getRepository(Noticia);
  }

  async createNews(params: {
    titulo: string;
    descricao: string;
  }): Promise<Noticia | undefined> {
    const { titulo, descricao } = params;

    const news = this.newsRepository.create({
      titulo,
      descricao,
    });
    await this.newsRepository.save(news);
    return news;
  }

  async listAll({
    page = 1,
    limit = 10,
    titulo,
    descricao,
  }: {
    page?: number;
    limit?: number;
    titulo?: string;
    descricao?: string;
  }) {
    const skip = (page - 1) * limit;

    const query = this.newsRepository.createQueryBuilder('news');

    if (titulo) {
      query.andWhere('news.titulo ILIKE :titulo', {
        titulo: `%${titulo}%`,
      });
    }

    if (descricao) {
      query.andWhere('news.descricao ILIKE :descricao', {
        descricao: `%${descricao}%`,
      });
    }

    const [data, total] = await query
      .skip(skip)
      .take(limit)
      .orderBy('news.id', 'DESC')
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateOne(newsData: any): Promise<Noticia | undefined> {
    const result = await this.newsRepository.save(newsData);
    return result;
  }

  async deleteOne(params: { id: number }): Promise<any> {
    const { id } = params;
    const result = await this.newsRepository.delete(id);
    return result;
  }
}

export default NewsTypeormRepository;
