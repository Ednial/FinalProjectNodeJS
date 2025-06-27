import { Transaction } from '../../../data';
import { CustomError } from '../../../domain';

export class CreatorTransactionService {
  async execute(data: any, sessionUser: any) {
    const transaction = new Transaction();
    transaction.sender_id = data.sender_id;
    transaction.receiver_id = data.receiver_id;
    transaction.user = sessionUser;

    try {
      await transaction.save();
      return {
        message: 'Transaction created successfully',
      };
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw CustomError.internalServer('Failed to make transaction');
    }
  }
}
