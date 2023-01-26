"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_router_1 = __importDefault(require("./routes/APIs/user.router"));
const product_router_1 = __importDefault(require("./routes/APIs/product.router"));
const order_router_1 = __importDefault(require("./routes/APIs/order.router"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcom to the storefront ordershop!');
});
app.get('/shop', (req, res) => {
    res.send('Welcom to the Shop route!');
});
app.use('/shop', user_router_1.default);
app.use('/shop', product_router_1.default);
app.use('/shop', order_router_1.default);
app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
