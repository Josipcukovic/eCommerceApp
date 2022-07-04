const AppStrings = {
  LOGOUT_SUCCESS: "You are logged out",
  UPDATE_SUCCESS: "Updated succesfully",
  DELETE_SUCCESS: "Deleted succesfully!",
};

const ErrorStrings = {
  CAST_TO_OBJECTID_FAILED: "Cast to ObjectId failed",
  INVALID_ID: "Invalid ID",
  INVALID_PASS_LENGTH: "Minimum password length is 6 characters",
  NOT_EXISTING_TOKEN: "Token doesn't exist",
  INVALID_TOKEN: "Invalid token",
  UNAUTHORIZED: "Unauthorized, you can't perform this task",
  INVALID_EMAIL_OR_PASSWORD: "Incorrect password or email",
  INTERNAL_SERVER_ERROR: "Internal server error",
  ITEM_REQUIRED: "At least one item must be provided",
  PRODUCT_DOESNT_EXIST: "Product with provided ID doesn't exist",
  BOOLEAN_REQUIRED: "Variable must be of type boolean",
  NOT_EXISTING_PRODUCT: "Product with provided ID doesn't exist",
};

export { ErrorStrings, AppStrings };
