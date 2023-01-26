import express, { Request, Response } from 'express';
import { product, StoreProduct } from '../models/product';
import verifyAuthToken from '../middlewares/authentication';

const productRouter = express.Router();

const stProduct = new StoreProduct();

// Create products
productRouter.post(
  '/products',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const p: product = {
        pname: req.body.pname,
        price: req.body.price,
        category: req.body.category,
      };

      const newProduct = await stProduct.create(p);
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

// Get all products
productRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await stProduct.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

// Get specific product
productRouter.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await stProduct.show(parseInt(req.params.id));
    res.status(200).json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

// Update Specific Product
productRouter.put(
  '/products/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const p: product = {
        pname: req.body.pname,
        price: req.body.price,
        category: req.body.category,
      };
      const updatedProduct = await stProduct.update(parseInt(req.params.id), p);
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

// Delete SPecific product
productRouter.delete(
  '/products/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      await stProduct.delete(parseInt(req.params.id));
      res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

export default productRouter;
