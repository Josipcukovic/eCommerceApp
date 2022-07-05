import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { AppStrings, ErrorStrings } from "../constants/appStrings";
import UserRepository from "../db/repositories/userRepository";
import { UserDocument } from "../models/userModel";
import { BadRequestError } from "../utils/errors";
import Helpers from "../utils/helpers";
import SuccessResponses from "../utils/successResponses";

class AuthController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      Helpers.validatePassword(data.password);

      const user = await UserRepository.save(data);

      const token = Helpers.createToken(user!._id, user!.email);
      Helpers.createCookie(res, token);

      const dataToReturn = Helpers.getUserDataToReturn(user!);

      return SuccessResponses.creationSuccess(res, dataToReturn);
    } catch (error) {
      return next(error);
    }
  }

  static async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = Helpers.getCurrentUserData(req)!;
      const user = await UserRepository.getUserById(id);
      const dataToReturn = Helpers.getUserDataToReturn(user!);
      return SuccessResponses.okResponse(res, dataToReturn);
    } catch (error) {
      return next(error);
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    let user: UserDocument | null;

    if (Helpers.loginDataIsEmpty({ email, password }))
      return next(new BadRequestError(ErrorStrings.INVALID_EMAIL_OR_PASSWORD));

    try {
      user = await UserRepository.getUserByEmail(email);
      if (!user)
        throw new BadRequestError(ErrorStrings.INVALID_EMAIL_OR_PASSWORD);

      const match = await Helpers.compareHashPassword(password, user.password);
      if (!match)
        return next(
          new BadRequestError(ErrorStrings.INVALID_EMAIL_OR_PASSWORD)
        );

      const token = Helpers.createToken(user._id, user.email);
      Helpers.createCookie(res, token);

      const dataToReturn = Helpers.getUserDataToReturn(user);
      return SuccessResponses.okResponse(res, dataToReturn);
    } catch (error) {
      return next(error);
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie(config.COOKIE_NAME);
    SuccessResponses.okResponse(res, AppStrings.LOGOUT_SUCCESS);
  }
}

export = AuthController;
