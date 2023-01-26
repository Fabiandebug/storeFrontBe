import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Test root and shop endpoint response', () => {
  it('gets the / endpoint', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
  });

  it('gets the /shop endpoint', async () => {
    const res = await request.get('/shop');
    expect(res.status).toBe(200);
  });
});
