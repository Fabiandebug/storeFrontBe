"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Testing users endpoints responses', () => {
    let token = '';
    // @ts-ignore
    const u = {
        id: '',
        username: 'kev',
        firstname: 'joe',
        lastname: 'kev',
        password_: 'password1',
    };
    it('Create a user ', async () => {
        const res = await request.post('/shop/users').send(u);
        token = res.body;
        expect(res.status).toBe(200);
    });
    it('should sign in a user ', async () => {
        const res = await request
            .post('/shop/users/authenticate')
            .send({ username: u.username, password_: u.password_ });
        expect(res.status).toBe(200);
    });
});
