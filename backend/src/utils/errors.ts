import { errorTypes, httpStatusCodes } from "../constants/appConstants";

class BaseError extends Error {
  constructor(readonly statusCode: number, readonly type: string, readonly message: string) {
    super();
  }
}

class CustomError extends BaseError {
  constructor(statusCode: number, type: string, message: string) {
    super(statusCode, type, message);
  }
}

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(httpStatusCodes.BAD_REQUEST, errorTypes.BAD_REQUEST, message);
  }
}

class InternalServerError extends BaseError {
  constructor(message: string) {
    super(httpStatusCodes.INTERNAL_SERVER, errorTypes.INTERNAL_SERVER, message);
  }
}

class DuplicatedValueError extends BaseError {
  constructor(message: string) {
    super(httpStatusCodes.BAD_REQUEST, errorTypes.DUPLICATED_VALUE, message);
  }
}

class ValidationError extends BaseError {
  constructor(message: string) {
    super(httpStatusCodes.BAD_REQUEST, errorTypes.VALIDATION, message);
  }
}

class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(httpStatusCodes.FORBIDDEN, errorTypes.FORBIDDEN, message);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(httpStatusCodes.UNAUTHORIZED, errorTypes.UNAUTHORIZED, message);
  }
}

export {
  BaseError,
  CustomError,
  BadRequestError,
  InternalServerError,
  DuplicatedValueError,
  ValidationError,
  ForbiddenError,
  UnauthorizedError,
};
