import { Router } from 'express';
import { TransactionRoutes } from './transactions/routes';
import { UserRoutes } from './user/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/transaction', TransactionRoutes.routes);
    router.use('/api/users', UserRoutes.routes);

    return router;
  }
}
