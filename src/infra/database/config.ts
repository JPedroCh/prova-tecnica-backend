import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [path.join(__dirname, '..', '..', '**', '*entity.{ts,js}')],
  synchronize: true,
});
