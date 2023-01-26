"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1];
        console.log('token in mid:', token);
        console.log(process.env.TOKEN_SECRET);
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        console.log('Valid token');
        return next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        console.log('Access denied, invalid token');
        return;
    }
};
exports.default = verifyAuthToken;
