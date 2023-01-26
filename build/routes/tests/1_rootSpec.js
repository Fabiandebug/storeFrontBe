"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('Test root and shop endpoint response', () => {
    it('gets the / endpoint', async () => {
        const res = await request.get('/');
        expect(res.status).toBe(200);
    });
    it('gets the /shop endpoint', async () => {
        const res = await request.get('/shop');
        expect(res.status).toBe(200);
    });
});
