enum Roles {
  Admin = "admin",
  User = "user",
}

const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER: 500,
};

const errorTypes = {
  BAD_REQUEST: "Bad Request",
  DUPLICATED_VALUE: "Duplicated value",
  VALIDATION: "Validation",
  INTERNAL_SERVER: "Internal Server Error",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
};

const AppConstants = {
  Roles,
  httpStatusCodes,
  errorTypes,
  pageSize: 8,
  pageNumber: 1,
  saltRounds: 10,
  tokenExpireTime: 60 * 60 * 24,
  cookieExpireTime: 60 * 60 * 24 * 1000,
  oneDayInMs: 24 * 60 * 60 * 1000,
};

export = AppConstants;
