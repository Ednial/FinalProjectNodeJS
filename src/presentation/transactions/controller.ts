import { Request, Response } from 'express';
import { CreatorTransactionService } from './services/creator-transaction.service';
import { FinderTransactionService } from './services/finder-transaction.service';
import { FinderTransactionsService } from './services/finder-transactions.service';
import { ApproveTransactionService } from './services/approve-transaction.service';
import { RejectTransactionService } from './services/reject-transaction.service';
import { handleError } from '../common/handleError';

export class TransactionController {
  constructor(
    private readonly finderTransactionService: FinderTransactionService,
    private readonly finderTransactionsService: FinderTransactionsService,
    private readonly creatorTransactionService: CreatorTransactionService,
    private readonly approveTransactionService: ApproveTransactionService,
    private readonly rejectTransactionService: RejectTransactionService
  ) {}

  createTransaction = (req: Request, res: Response) => {
    const data = req.body;

    this.creatorTransactionService
      .execute(data, req.body.sessionUser)
      .then((result) => res.status(201).json(result))
      .catch((error) => handleError(error, res));
  };

  findAllTransactions = (req: Request, res: Response) => {
    this.finderTransactionsService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  findTransactionById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderTransactionService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  approve = (req: Request, res: Response) => {
    const { id } = req.params;
    this.approveTransactionService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  reject = (req: Request, res: Response) => {
    const { id } = req.params;
    this.rejectTransactionService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };
}
