import { user, StoreUser } from '../user';
import bcrypt from 'bcrypt';
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

const stUser = new StoreUser();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(stUser.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(stUser.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(stUser.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    // @ts-ignore
    const username = 'kev';
    const firstname = 'joe';
    const lastname = 'kev';
    const password_ = 'password1';
    const result = await stUser.create(
      username,
      firstname,
      lastname,
      password_
    );

    expect(bcrypt.compareSync('password1' + pepper, result.password_)).toEqual(
      true
    );
    expect(result.firstname).toEqual('joe');
    expect(result.lastname).toEqual('kev');
  });

  it('index method should return a list of users', async () => {
    const result = await stUser.index();
    //console.log(typeof(result)) //gave me object
    expect(Array.isArray(result)).toBe(true);
  });
});
