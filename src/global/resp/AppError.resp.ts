import { ApolloError } from 'apollo-server-errors';

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return { message: JSON.stringify(maybeError) };
  } catch {
    throw new AppError(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export class AppError extends ApolloError {
  constructor(message: unknown) {
    const formattedMessage = getErrorMessage(message);
    super(formattedMessage, 'APP_ERROR');
    Object.defineProperty(this, 'name', { value: 'AppError' });
  }
}
