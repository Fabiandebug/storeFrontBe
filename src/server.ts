import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user.router';
import productRouter from './routes/product.router';
import orderRouter from './routes/order.router';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcom to the storefront ordershop!');
});

app.get('/shop', (req: Request, res: Response) => {
  res.send('Welcom to the Shop route!');
});

app.use('/shop', userRouter);
app.use('/shop', productRouter);
app.use('/shop', orderRouter);

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
