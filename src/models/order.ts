import client from './../database/database';

export type order = {
  id: number;
  userid: number;
  ostatus: string;
};

export type product = {
  productid: number;
  productqty: number;
};

export type order_product = {
  id: number;
  userid: number;
  ostatus: string;
  orderid: number;
  productid: number;
  productqty: number;
};

export class StoreOrder {
  async create(o: order, p: product[]): Promise<order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql1 = `INSERT INTO storeorder (userid, ostatus) VALUES ($1, $2) RETURNING *`;
      const result1 = await conn.query(sql1, [o.userid, o.ostatus]);
      const sqlOrderId = `SELECT id FROM storeorder ORDER BY id DESC limit 1`;
      const orderId = await conn.query(sqlOrderId);
      for (let i = 0; i < p.length; i++) {
        const sql2 = `INSERT INTO orderproduct (orderid, productid, productqty) VALUES($1, $2, $3) RETURNING *`;
        const result2 = await conn.query(sql2, [
          orderId.rows[0]['id'],
          p[i].productid,
          p[i].productqty,
        ]);
      }
      conn.release();
      return result1.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order. ${error}`);
    }
  }

  async showActiveOrder(userid: number): Promise<order_product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM storeorder o join orderproduct op on o.id=op.orderid 
      where o.userid=($1) and o.ostatus='active'`;
      const result = await conn.query(sql, [userid]);
      conn.release();
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot show current order. ${error}`);
    }
  }

  async update(o: order): Promise<void> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `UPDATE storeorder SET ostatus=$1 WHERE id=$2`;
      await conn.query(sql, [o.ostatus, o.id]);
      conn.release();
    } catch (error) {
      throw new Error(`Cannot update order. ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `UPDATE storeorder SET ostatus = 'terminated' WHERE id = $1`;
      await conn.query(sql, [id]);
      const sql1 = `DELETE FROM orderproduct WHERE orderid = $1`;
      await conn.query(sql1, [id]);
      conn.release();
    } catch (error) {
      throw new Error(`Cannot delete order.${error}`);
    }
  }
}
