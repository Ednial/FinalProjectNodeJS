import { User } from '../../../data';
import { CustomError } from '../../../domain';

function accountNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const randomDigits = Math.floor(Math.random() * 9000000).toString();
  return timestamp + randomDigits;
}

export class FinderUserService {
  async executeByFindOne(id: string) {
    const user = await User.findOne({
      select: ['id', 'username', 'email', 'role'],
      where: {
        id,
        accountNumber: accountNumber(),
      },
    });

    if (!user) {
      throw CustomError.notFound('User not found');
    }

    return user;
  }
}
