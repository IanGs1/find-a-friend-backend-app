export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email/Password is wrong! Please, provide valid credentials!");
  };
};