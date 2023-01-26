import app from '../../server';
import supertest from 'supertest';
import { user } from '../../models/user';
import { product } from '../../models/product';

const request = supertest(app);

describe('Testing products endpoints responses', () => {
  let token = '';
  // @ts-ignore
  const u: user = {
    username: 'kev',
    firstname: 'joe',
    lastname: 'kev',
    password_: 'password1',
  };

  it('makes a user before testing products', async () => {
    const res = await request.post('/shop/users').send(u);
    token = res.body;
    expect(res.status).toBe(200);
  });

  const p: product = {
    // @ts-ignore
    id: '',
    pname: 'bread',
    price: 100,
    category: 'foods',
  };

  it('tests the [POST] /shop/products endpoint', async () => {
    const res = await request
      .post('/shop/products')
      .send(p)
      .set('Authorization', `Bearer ${token}`);
    token = res.body;
    expect(res.status).toBe(200);
  });

  it('tests the [GET] /shop/products endpoint', async () => {
    const res = await request.get('/shop/products');
    expect(res.status).toBe(200);
  });

  it('tests the [GET] /shop/users/:id endpoint', async () => {
    const res = await request.get('/shop/products/1');
    expect(res.status).toBe(200);
  });
});
