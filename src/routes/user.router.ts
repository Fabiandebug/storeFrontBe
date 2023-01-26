import express, { Request, Response } from 'express';
import { user, StoreUser } from './../../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../../middlewares/authentication';

const userRouter = express.Router();

const stUser = new StoreUser();

userRouter.post('/users', async (req: Request, res: Response) => {
  try {
    //Signup or Create route
    // @ts-ignore

    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password_ = req.body.password_;

    const newUser = await stUser.create(
      username,
      firstname,
      lastname,
      password_
    );

    var token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as jwt.Secret
    );
    res.status(200).json(token);
    console.log(`authTkn:${token}`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

userRouter.get('/users', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    //Index Route
    const users = await stUser.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}
);

userRouter.get(
  '/users/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      //Show route;
      const user = await stUser.show(parseInt(req.params.id));
      res.status(200).json(user);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

userRouter.post('/users/authenticate', async (req: Request, res: Response) => {
  // Sign-in or authenticate route
  try {
    // @ts-ignore
    const u: user = {
      username: req.body.username,
      password_: req.body.password_,
    };
    const authenticatedUser = await stUser.authenticate(u);
    if (authenticatedUser) {
      const token = jwt.sign(
        { user: authenticatedUser },
        process.env.TOKEN_SECRET as jwt.Secret
      );
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.put(
  '/users/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    // Update Route
    try {
      // @ts-ignore
      const u: user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password_: req.body.password_,
        username: req.body.username,
      };
      const updatedUser = await stUser.update(parseInt(req.params.id), u);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

userRouter.delete(
  '/users/:id',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      // DELETE route
      await stUser.delete(parseInt(req.params.id));
      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

export default userRouter;
