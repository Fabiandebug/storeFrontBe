"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../models/order");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const orderRouter = express_1.default.Router();
const stOrder = new order_1.StoreOrder();
// Create orders
orderRouter.post('/orders', authentication_1.default, async (req, res) => {
    try {
        const o = {
            id: req.body.id,
            userid: req.body.userid,
            ostatus: req.body.ostatus,
        };
        const products = req.body.products;
        const order = await stOrder.create(o, products);
        res.status(200).json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
// Get all active orders
orderRouter.get('/orders/active/:userId', authentication_1.default, async (req, res) => {
    try {
        const order = await stOrder.showActiveOrder(parseInt(req.params.userId));
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Update orders
orderRouter.put('/orders/:id', authentication_1.default, async (req, res) => {
    try {
        // @ts-ignore
        const o = {
            id: parseInt(req.params.id),
            ostatus: req.body.ostatus,
        };
        await stOrder.update(o);
        res.sendStatus(200);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
// Delete Orders
orderRouter.delete('/orders/:id', authentication_1.default, async (req, res) => {
    try {
        await stOrder.delete(parseInt(req.params.id));
        res.sendStatus(200);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.default = orderRouter;
