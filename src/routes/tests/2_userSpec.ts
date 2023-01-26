import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
describe('Testing users endpoints responses', () => {
  let token = '';
  // @ts-ignore
  const u: user = {
    id: '',
    username: 'kev',
    firstname: 'joe',
    lastname: 'kev',
    password_: 'password1',
  };

  it('Create a user ', async () => {
    const res = await request.post('/shop/users').send(u);
    token = res.body;
    expect(res.status).toBe(200);
  });

  it('should sign in a user ', async () => {
    const res = await request
      .post('/shop/users/authenticate')
      .send({ username: u.username, password_: u.password_ });
    expect(res.status).toBe(200);
  });
});
