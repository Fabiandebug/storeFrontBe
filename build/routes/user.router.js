"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const userRouter = express_1.default.Router();
const stUser = new user_1.StoreUser();
userRouter.post('/users', async (req, res) => {
    try {
        //Signup or Create route
        // @ts-ignore
        const username = req.body.username;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password_ = req.body.password_;
        const newUser = await stUser.create(username, firstname, lastname, password_);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.status(200).json(token);
        console.log(`authTkn:${token}`);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
userRouter.get('/users', authentication_1.default, async (req, res) => {
    try {
        //Index Route
        const users = await stUser.index();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
userRouter.get('/users/:id', authentication_1.default, async (req, res) => {
    try {
        //Show route;
        const user = await stUser.show(parseInt(req.params.id));
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
userRouter.post('/users/authenticate', async (req, res) => {
    // Sign-in or authenticate route
    try {
        // @ts-ignore
        const u = {
            username: req.body.username,
            password_: req.body.password_,
        };
        const authenticatedUser = await stUser.authenticate(u);
        if (authenticatedUser) {
            const token = jsonwebtoken_1.default.sign({ user: authenticatedUser }, process.env.TOKEN_SECRET);
            res.status(200).json({ token: token });
        }
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});
userRouter.put('/users/:id', authentication_1.default, async (req, res) => {
    // Update Route
    try {
        // @ts-ignore
        const u = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password_: req.body.password_,
            username: req.body.username,
        };
        const updatedUser = await stUser.update(parseInt(req.params.id), u);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
userRouter.delete('/users/:id', authentication_1.default, async (req, res) => {
    try {
        // DELETE route
        await stUser.delete(parseInt(req.params.id));
        res.status(200).json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = userRouter;
