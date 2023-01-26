import express, { Request, Response } from 'express';
import { order, product, StoreOrder } from '../models/order';
import verifyAuthToken from '../middlewares/authentication';

const orderRouter = express.Router();

const stOrder = new StoreOrder();

// Create orders
orderRouter.post(
  '/orders',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const o: order = {
        id: req.body.id,
        userid: req.body.userid,
        ostatus: req.body.ostatus,
      };
      const products: product[] = req.body.products;
      const order = await stOrder.create(o, products);
      res.status(200).json(order);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  }
);

// Get all active orders
orderRouter.get(
  '/orders/active/:userId',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const order = await stOrder.showActiveOrder(parseInt(req.params.userId));
      res.status(200).json(order);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

// Update orders

orderRouter.put(
  '/orders/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const o: order = {
        id: parseInt(req.params.id),
        ostatus: req.body.ostatus,
      };
      await stOrder.update(o);
      res.sendStatus(200);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  }
);

// Delete Orders
orderRouter.delete(
  '/orders/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      await stOrder.delete(parseInt(req.params.id));
      res.sendStatus(200);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  }
);

export default orderRouter;
