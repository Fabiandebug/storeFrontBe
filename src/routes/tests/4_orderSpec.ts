import app from '../../server';
import supertest from 'supertest';
import { user } from '../../models/user';

const request = supertest(app);

describe('Test orders endpoints responses', () => {
  let token = '';
  // @ts-ignore
  const u: user = {
    username: 'kev',
    firstname: 'joe',
    lastname: 'kev',
    password_: 'password1',
  };

  it('makes a user before testing ordes', async () => {
    const res = await request.post('/shop/users').send(u);
    token = res.body;
    console.log('token in order:', token);
    expect(res.status).toBe(200);
  });

  it('tests the [GET] /shop/orders/active endpoint', async () => {
    const res = await request
      .get('/shop/orders/active/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
