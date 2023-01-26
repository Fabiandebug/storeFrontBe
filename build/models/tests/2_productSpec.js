"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const stProduct = new product_1.StoreProduct();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(stProduct.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(stProduct.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(stProduct.create).toBeDefined();
    });
    it('should have an update method', () => {
        expect(stProduct.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(stProduct.delete).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result1 = await stProduct.create({
            id: 1,
            pname: 'bread',
            price: 100,
            category: 'foods',
        });
        expect(result1.pname).toEqual('bread');
        expect(result1.price).toBeCloseTo(100, 5);
        expect(result1.category).toEqual('foods');
    });
    it('index method should return a list of products', async () => {
        const result = await stProduct.index();
        expect(Array.isArray(result)).toBe(true);
    });
    it('show method should return the correct product', async () => {
        const result = await stProduct.show(1);
        expect(result.pname).toEqual('bread');
        expect(result.price).toBeCloseTo(100, 5);
        expect(result.category).toEqual('foods');
    });
    it('update method should update a product', async () => {
        // @ts-ignore
        const result1 = await stProduct.update(1, {
            pname: 'bread',
            price: 120,
            category: 'foods',
        });
        expect(result1.pname).toEqual('bread');
        expect(result1.price).toBeCloseTo(120, 3);
        expect(result1.category).toEqual('foods');
    });
});
