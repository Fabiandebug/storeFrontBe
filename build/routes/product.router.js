"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const productRouter = express_1.default.Router();
const stProduct = new product_1.StoreProduct();
// Create products
productRouter.post('/products', authentication_1.default, async (req, res) => {
    try {
        // @ts-ignore
        const p = {
            pname: req.body.pname,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await stProduct.create(p);
        res.status(200).json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Get all products
productRouter.get('/products', async (req, res) => {
    try {
        const products = await stProduct.index();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Get specific product
productRouter.get('/products/:id', async (req, res) => {
    try {
        const product = await stProduct.show(parseInt(req.params.id));
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Update Specific Product
productRouter.put('/products/:id', authentication_1.default, async (req, res) => {
    try {
        // @ts-ignore
        const p = {
            pname: req.body.pname,
            price: req.body.price,
            category: req.body.category,
        };
        const updatedProduct = await stProduct.update(parseInt(req.params.id), p);
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Delete SPecific product
productRouter.delete('/products/:id', authentication_1.default, async (req, res) => {
    try {
        await stProduct.delete(parseInt(req.params.id));
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = productRouter;
