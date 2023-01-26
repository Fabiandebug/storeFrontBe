"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('Test orders endpoints responses', () => {
    let token = '';
    // @ts-ignore
    const u = {
        username: 'kev',
        firstname: 'joe',
        lastname: 'kev',
        password_: 'password1',
    };
    it('makes a user before testing ordes', async () => {
        const res = await request.post('/shop/users').send(u);
        token = res.body;
        console.log('token in order:', token);
        expect(res.status).toBe(200);
    });
    it('tests the [GET] /shop/orders/active endpoint', async () => {
        const res = await request
            .get('/shop/orders/active/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
