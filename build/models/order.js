"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreOrder = void 0;
const database_1 = __importDefault(require("./../database/database"));
class StoreOrder {
    async create(o, p) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
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
        }
        catch (error) {
            throw new Error(`Cannot create order. ${error}`);
        }
    }
    async showActiveOrder(userid) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM storeorder o join orderproduct op on o.id=op.orderid 
      where o.userid=($1) and o.ostatus='active'`;
            const result = await conn.query(sql, [userid]);
            conn.release();
            console.log(result.rows);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot show current order. ${error}`);
        }
    }
    async update(o) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = `UPDATE storeorder SET ostatus=$1 WHERE id=$2`;
            await conn.query(sql, [o.ostatus, o.id]);
            conn.release();
        }
        catch (error) {
            throw new Error(`Cannot update order. ${error}`);
        }
    }
    async delete(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = `UPDATE storeorder SET ostatus = 'terminated' WHERE id = $1`;
            await conn.query(sql, [id]);
            const sql1 = `DELETE FROM orderproduct WHERE orderid = $1`;
            await conn.query(sql1, [id]);
            conn.release();
        }
        catch (error) {
            throw new Error(`Cannot delete order.${error}`);
        }
    }
}
exports.StoreOrder = StoreOrder;
