import { Noticia } from './news-entity';

export interface NewsRepository {
  createNews(params: {
    titulo: string;
    descricao: string;
  }): Promise<Noticia | undefined>;
  listAll(): Promise<Noticia | undefined>;
  updateOne(params: {
    id: number;
    title: string;
    description: string;
  }): Promise<Noticia | undefined | null>;
  deleteOne(params: { id: number }): Promise<Noticia | undefined>;
}
