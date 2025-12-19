import request from 'supertest';
import { app } from '../../src/app';
import { dataSource } from '../../src/infra/database/config';

jest.setTimeout(15000);

describe('Create Noticia (BDD)', () => {
  beforeAll(async () => {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('should create a noticia when payload is valid', async () => {
    // GIVEN
    const payload = {
      titulo: 'Nova Notícia',
      descricao: 'Descrição válida',
    };

    // WHEN
    const response = await request(app).post('/create').send(payload);

    // THEN
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe(payload.titulo);
  });

  it('should return 400 when payload is invalid', async () => {
    // GIVEN
    const payload = {
      titulo: '',
      descricao: '',
    };

    // WHEN
    const response = await request(app).post('/create').send(payload);

    // THEN
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Validation error');
  });
});
