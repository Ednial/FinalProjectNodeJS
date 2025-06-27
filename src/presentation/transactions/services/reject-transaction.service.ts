import { TransactionStatus } from '../../../data';
import { CustomError } from '../../../domain';
import { FinderTransactionService } from './finder-transaction.service';

export class RejectTransactionService {
  constructor(
    private readonly finderTransactionService: FinderTransactionService
  ) {}

  async execute(id: string) {
    const transaction = await this.finderTransactionService.executeByFindOne(
      id
    );

    if (transaction.status === 'approved') {
      throw CustomError.badRequest('Transaction already approved');
    }

    if (transaction.status === 'rejected') {
      throw CustomError.badRequest('Transaction already rejected');
    }

    transaction.status = TransactionStatus.REJECTED;

    try {
      await transaction.save();
      return {
        message: 'Transaction rejected successfully',
      };
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      throw CustomError.internalServer('Failed to reject transaction');
    }
  }
}
