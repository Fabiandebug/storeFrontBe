import client from './../database/database';
import bcrypt from 'bcrypt';
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type user = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password_: string;
};

export class StoreUser {
  async index(): Promise<user[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM Users';
      const result = await conn.query(sql);
      conn.release();
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users. ${error}`);
    }
  }

  async create(
    username: string,
    firstname: string,
    lastname: string,
    password_: string
  ): Promise<user> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO Users (username,firstname, lastname, password_) VALUES ($1, $2, $3, $4) RETURNING *`;

      const hash = bcrypt.hashSync(
        password_ + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [
        username,
        firstname,
        lastname,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${username}): ${err}`);
    }
  }

  async show(id: number): Promise<user> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM Users where id=($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      console.log(result.rows[0]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot show user. ${error}`);
    }
  }

  async authenticate(u: user): Promise<user | null> {
    try {
      //@ts-ignore
      const conn = client.connect();
      const sql = `SELECT password_ from users where username=($1)`;
      const result = await (await conn).query(sql, [u.username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(u.password_ + pepper, user.password_)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Cannot authenticate user. ${error}`);
    }
  }

  async update(id: number, u: user): Promise<user> {
    try {
      // @ts-ignore
      const conn = client.connect();
      const hash = bcrypt.hashSync(
        u.password_ + pepper,
        parseInt(saltRounds as string)
      );
      const sql = `UPDATE Users SET firstname = $1, lastname = $2, password_ = $3 WHERE id = $4 RETURNING *`;
      const result = await (
        await conn
      ).query(sql, [u.firstname, u.lastname, hash, id]);
      (await conn).release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update user. ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `DELETE FROM Users WHERE id = $1`;
      await conn.query(sql, [id]);
      conn.release();
    } catch (error) {
      throw new Error(`Cannot delete user.${error}`);
    }
  }
}
