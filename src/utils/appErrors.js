const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(
    description,
    statusCode,
    message,
    isOperational,
    errorStack,
    loggingErrorResponse
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = loggingErrorResponse;
    this.description = description;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this);
  }
}

class APIError extends AppError {
  constructor(
    description = "Internal Server Error",
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    message = `${statusCode} Error`,
    isOperational = true
  ) {
    super(description, statusCode, message, isOperational);
  }
}

class BadRequestError extends AppError {
  constructor(
    description,
    statusCode = STATUS_CODES.BAD_REQUEST,
    message = `${statusCode} Bad Request`,
    isOperational = true,
    loggingErrorResponse
  ) {
    super(
      description,
      statusCode,
      message,
      isOperational,
      loggingErrorResponse
    );
  }
}

class NotFoundError extends AppError {
  constructor(
    description,
    statusCode = STATUS_CODES.NOT_FOUND,
    message = `${statusCode} NOT FOUND`,
    isOperational = true,
    loggingErrorResponse
  ) {
    super(
      description,
      statusCode,
      message,
      isOperational,
      loggingErrorResponse
    );
  }
}

export { AppError, APIError, BadRequestError, STATUS_CODES, NotFoundError };
