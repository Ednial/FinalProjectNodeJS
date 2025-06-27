import { TransactionStatus } from '../../../data';
import { CustomError } from '../../../domain';
import { FinderTransactionService } from './finder-transaction.service';

export class ApproveTransactionService {
  constructor(
    private readonly finderTransactionService: FinderTransactionService
  ) {}

  async execute(id: string) {
    const transaction = await this.finderTransactionService.executeByFindOne(
      id
    );

    if (transaction.status === 'approved') {
      throw new Error('Transaction already approved');
    }

    transaction.status = TransactionStatus.APPROVED;

    try {
      await transaction.save();
      return {
        message: 'Transaction approved successfully',
      };
    } catch (error) {
      CustomError.internalServer('Error approving transaction');
    }
  }
}
