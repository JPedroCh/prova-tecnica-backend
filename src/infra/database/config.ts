import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Noticia } from '../../api/repositories/news/news-entity';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: envFile });

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Noticia],
  synchronize: true,
});
