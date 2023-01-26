"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreUser = void 0;
const database_1 = __importDefault(require("./../database/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class StoreUser {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM Users';
            const result = await conn.query(sql);
            conn.release();
            console.log(result.rows);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get users. ${error}`);
        }
    }
    async create(username, firstname, lastname, password_) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO Users (username,firstname, lastname, password_) VALUES ($1, $2, $3, $4) RETURNING *`;
            const hash = bcrypt_1.default.hashSync(password_ + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [username, firstname, lastname, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable create user (${username}): ${err}`);
        }
    }
    async show(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM Users where id=($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            console.log(result.rows[0]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot show user. ${error}`);
        }
    }
    async authenticate(u) {
        try {
            //@ts-ignore
            const conn = database_1.default.connect();
            const sql = `SELECT password_ from users where username=($1)`;
            const result = await (await conn).query(sql, [u.username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(u.password_ + pepper, user.password_)) {
                    return user;
                }
            }
            return null;
        }
        catch (error) {
            throw new Error(`Cannot authenticate user. ${error}`);
        }
    }
    async update(id, u) {
        try {
            // @ts-ignore
            const conn = database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password_ + pepper, parseInt(saltRounds));
            const sql = `UPDATE Users SET firstname = $1, lastname = $2, password_ = $3 WHERE id = $4 RETURNING *`;
            const result = await (await conn).query(sql, [u.firstname, u.lastname, hash, id]);
            (await conn).release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot update user. ${error}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM Users WHERE id = $1`;
            await conn.query(sql, [id]);
            conn.release();
        }
        catch (error) {
            throw new Error(`Cannot delete user.${error}`);
        }
    }
}
exports.StoreUser = StoreUser;
