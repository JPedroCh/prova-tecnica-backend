import dotenv from 'dotenv';
import { app } from './app';
import { dataSource } from './infra/database/config';

dotenv.config();

async function bootstrap() {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    const port = Number(process.env.API_PORT) || 3001;

    app.listen(port, '0.0.0.0', () => console.log(`Running on port ${port}`));
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  }
}

bootstrap();
