"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProduct = void 0;
const database_1 = __importDefault(require("./../database/database"));
// Get all products
class StoreProduct {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get products. ${error}`);
        }
    }
    // Create product
    async create(p) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO product (pName, price, category) VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(sql, [p.pname, p.price, p.category]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot create product. ${error}`);
        }
    }
    // Fetch specfic product
    async show(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM product where id=($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot show product:${error}`);
        }
    }
    // Update products
    async update(id, p) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = `UPDATE product SET pName = $1, price = $2, category = $3 WHERE id = $4 RETURNING *`;
            const result = await conn.query(sql, [p.pname, p.price, p.category, id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot update product. ${error}`);
        }
    }
    // Delete Product
    async delete(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = ` DELETE FROM product WHERE id = $1`;
            await conn.query(sql, [id]);
            conn.release();
        }
        catch (error) {
            throw new Error(`Cannot delete product. ${error}`);
        }
    }
}
exports.StoreProduct = StoreProduct;
