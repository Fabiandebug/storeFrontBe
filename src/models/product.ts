import client from './../database/database';

export type product = {
  id: number;
  pname: string;
  price: number;
  category: string;
};

// Get all products
export class StoreProduct {
  async index(): Promise<product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products. ${error}`);
    }
  }
  // Create product
  async create(p: product): Promise<product> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO product (pName, price, category) VALUES ($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [p.pname, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create product. ${error}`);
    }
  }

  // Fetch specfic product
  async show(id: number): Promise<product> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM product where id=($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot show product:${error}`);
    }
  }

  // Update products
  async update(id: number, p: product): Promise<product> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `UPDATE product SET pName = $1, price = $2, category = $3 WHERE id = $4 RETURNING *`;
      const result = await conn.query(sql, [p.pname, p.price, p.category, id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update product. ${error}`);
    }
  }
  // Delete Product
  async delete(id: number): Promise<void> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = ` DELETE FROM product WHERE id = $1`;
      await conn.query(sql, [id]);
      conn.release();
    } catch (error) {
      throw new Error(`Cannot delete product. ${error}`);
    }
  }
}
