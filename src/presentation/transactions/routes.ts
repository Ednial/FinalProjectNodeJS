import { Router } from 'express';
import { TransactionController } from './controller';
import { CreatorTransactionService } from './services/creator-transaction.service';
import { FinderTransactionService } from './services/finder-transaction.service';
import { FinderTransactionsService } from './services/finder-transactions.service';
import { ApproveTransactionService } from './services/approve-transaction.service';
import { RejectTransactionService } from './services/reject-transaction.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { Role } from '../../data';

export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();

    const creatorTransactionService = new CreatorTransactionService();
    const finderTransactionService = new FinderTransactionService();
    const finderTransactionsService = new FinderTransactionsService();
    const approveTransactionService = new ApproveTransactionService(
      finderTransactionService
    );
    const rejectTransactionService = new RejectTransactionService(
      finderTransactionService
    );

    const transactionController = new TransactionController(
      finderTransactionService,
      finderTransactionsService,
      creatorTransactionService,
      approveTransactionService,
      rejectTransactionService
    );

    router.use(AuthMiddleware.protect);
    router.get('/', transactionController.findAllTransactions);
    router.get('/:id', transactionController.findTransactionById);
    router.post(
      '/',
      AuthMiddleware.restrictTo(Role.SENDER),
      transactionController.createTransaction
    );

    return router;
  }
}
