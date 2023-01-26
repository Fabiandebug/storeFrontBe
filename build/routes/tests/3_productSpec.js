"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('Testing products endpoints responses', () => {
    let token = "";
    // @ts-ignore
    const u = {
        username: "kev",
        firstname: 'joe',
        lastname: 'kev',
        password_: 'password1',
    };
    it('makes a user before testing products', async () => {
        const res = await request.post('/shop/users').send(u);
        token = res.body;
        expect(res.status).toBe(200);
    });
    const p = {
        // @ts-ignore
        id: '',
        pname: 'bread',
        price: 100,
        category: 'foods',
    };
    it('tests the [POST] /shop/products endpoint', async () => {
        const res = await request
            .post('/shop/products')
            .send(p)
            .set('Authorization', `Bearer ${token}`);
        token = res.body;
        expect(res.status).toBe(200);
    });
    it('tests the [GET] /shop/products endpoint', async () => {
        const res = await request.get('/shop/products');
        expect(res.status).toBe(200);
    });
    it('tests the [GET] /shop/users/:id endpoint', async () => {
        const res = await request.get('/shop/products/1');
        expect(res.status).toBe(200);
    });
});
