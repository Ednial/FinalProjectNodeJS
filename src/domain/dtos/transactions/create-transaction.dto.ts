import {
  object,
  string,
  number,
  safeParse,
  minLength,
  pipe,
  maxLength,
  minValue,
  maxValue,
} from 'valibot';

import * as v from 'valibot';

export const CreateTransactionSechema = object({
  sender_id: pipe(string('sender_id is required')),
  receiver_id: pipe(string('receiver_id is required')),
  userId: pipe(string('userId is required')),
});

export class CreateTransactionDto {
  constructor(
    public readonly sender_id: string,
    public readonly receiver_id: string,
    public readonly userId: string
  ) {}

  static execute(input: {
    [key: string]: any;
  }): [string?, CreateTransactionDto?] {
    const result = safeParse(CreateTransactionSechema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'Validation failed';
      return [error];
    }

    const { sender_id, receiver_id, userId } = result.output as {
      sender_id: string;
      receiver_id: string;
      userId: string;
    };
    return [
      undefined,
      new CreateTransactionDto(sender_id, receiver_id, userId),
    ];
  }
}
