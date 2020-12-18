import express, { IRouter } from 'express';
import userRoute from './user.route';

const router = express.Router();

/**
 * Function contains Application routes
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/account', new userRoute().getRoutes());

  return router;
};

export default routes;
