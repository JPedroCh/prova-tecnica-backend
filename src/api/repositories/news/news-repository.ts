import { Noticia } from './news-entity';

export interface NewsRepository {
  createNews(params: {
    titulo: string;
    descricao: string;
  }): Promise<Noticia | undefined>;
  listAll(params: {
    page?: number;
    limit?: number;
    titulo?: string;
    descricao?: string;
  }): Promise<{
    data: Noticia[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
  updateOne(params: {
    id: number;
    title: string;
    description: string;
  }): Promise<Noticia | undefined | null>;
  deleteOne(params: { id: number }): Promise<Noticia | undefined>;
}
