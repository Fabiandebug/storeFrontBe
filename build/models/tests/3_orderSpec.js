"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const stOrder = new order_1.StoreOrder();
describe('Order Model', () => {
    it('should have a create method', () => {
        expect(stOrder.create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(stOrder.showActiveOrder).toBeDefined();
    });
    it('create method should return the correct order', async () => {
        // @ts-ignore
        const o = {
            userid: 1,
            ostatus: 'active',
        };
        const op1 = {
            productid: 1,
            productqty: 3,
        };
        const op2 = {
            productid: 1,
            productqty: 2,
        };
        const result = await stOrder.create(o, [op1, op2]);
        expect(result.userid).toEqual(1);
        expect(result.ostatus).toEqual('active');
    });
    it('show method should return the correct order', async () => {
        const result = await stOrder.showActiveOrder(1);
        expect(result[0].userid).toEqual(1);
        expect(result[0].ostatus).toEqual('active');
        expect(result[0].productid).toEqual(1);
        expect(result[0].productqty).toEqual(3);
    });
});
