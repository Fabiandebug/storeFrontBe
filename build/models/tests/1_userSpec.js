"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const stUser = new user_1.StoreUser();
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
        const username = "kev";
        const firstname = "joe";
        const lastname = "kev";
        const password_ = "password1";
        const result = await stUser.create(username, firstname, lastname, password_);
        expect(bcrypt_1.default.compareSync('password1' + pepper, result.password_)).toEqual(true);
        expect(result.firstname).toEqual('joe');
        expect(result.lastname).toEqual('kev');
    });
    it('index method should return a list of users', async () => {
        const result = await stUser.index();
        //console.log(typeof(result)) //gave me object
        expect(Array.isArray(result)).toBe(true);
    });
});
