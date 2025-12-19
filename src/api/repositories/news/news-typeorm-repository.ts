import { newsCache } from '../../../infra/cache/news-cache';
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
    const cacheKey = JSON.stringify({ page, limit, titulo, descricao });
    const cached = newsCache.get(cacheKey);
    if (cached) return cached;

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

    const result = {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    newsCache.set(cacheKey, result);

    return result;
  }

  async updateOne(newsData: any): Promise<Noticia | undefined | null> {
    const existing = await this.newsRepository.findOne({
      where: { id: newsData.id },
    });

    if (!existing) {
      return null;
    }

    const updated = await this.newsRepository.save({
      ...existing,
      ...newsData,
    });

    return updated;
  }

  async deleteOne(params: { id: number }): Promise<any> {
    const { id } = params;
    const result = await this.newsRepository.delete(id);
    if (result.affected === 0) {
      return null;
    }
    return result;
  }
}

export default NewsTypeormRepository;
