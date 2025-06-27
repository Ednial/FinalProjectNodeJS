import {
  object,
  string,
  safeParse,
  minLength,
  pipe,
  maxLength,
  nonEmpty,
  email,
} from 'valibot';

export const RegisterUserSchema = object({
  username: pipe(
    string('username is required'),
    minLength(3, 'username must be a least 3 characters long'),
    maxLength(70, 'username must be a most 30 characters long')
  ),
  password: pipe(
    string(),
    nonEmpty('Please enter your password.'),
    minLength(8, 'Your password must have 8 characters or more.')
  ),
  email: pipe(
    string(),
    nonEmpty('Please enter your email.'),
    email('The email address is badly formatted.')
  ),
});

export class RegisterUserDto {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly email: string
  ) {}

  static execute(input: { [key: string]: any }): [string?, RegisterUserDto?] {
    const result = safeParse(RegisterUserSchema, input);

    if (!result.success) {
      const error = result.issues[0]?.message ?? 'Validation failed';
      return [error];
    }

    const { username, password, email } = result.output as {
      username: string;
      password: string;
      email: string;
    };
    return [undefined, new RegisterUserDto(username, password, email)];
  }
}
