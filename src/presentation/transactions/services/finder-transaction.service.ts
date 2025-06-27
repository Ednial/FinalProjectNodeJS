import { Transaction } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderTransactionService {
  async executeByFindOne(id: string) {
    const transaction = await Transaction.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!transaction) {
      throw CustomError.notFound('Transaction not found');
    }

    return transaction;
  }
}
