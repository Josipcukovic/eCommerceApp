import { httpStatusCodes } from "../constants/appConstants";
import { CustomError, DuplicatedValueError, ValidationError } from "./errors";

function getMongoErrors(error: any) {
  if (error.code == 11000) throw new DuplicatedValueError(`Duplicated value: ${Object.keys(error.keyValue)}`);

  if (error.message.toLowerCase().includes("validation failed")) {
    let errors: any = {};

    Object.values(error.errors).forEach((properties: any) => {
      errors[properties.path] = properties.message;
    });

    throw new ValidationError(errors);
  }
  throw new CustomError(httpStatusCodes.INTERNAL_SERVER, error.name, error.message);
}

export { getMongoErrors };
