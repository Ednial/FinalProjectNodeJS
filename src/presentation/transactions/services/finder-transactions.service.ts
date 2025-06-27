import { Transaction } from '../../../data';

export class FinderTransactionsService {
  async executeByFindAll() {
    const transactions = await Transaction.find({
      where: {},
      relations: {
        user: true,
      },
    });
    return transactions;
  }
}
