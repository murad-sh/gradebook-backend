export class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class NotAuthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}
export class NotAuthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 422);
  }
}
