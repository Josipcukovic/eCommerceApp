import { NextFunction, Request, Response } from "express";
import UserRepository from "../db/repositories/userRepository";
import Helpers from "../utils/helpers";
import SuccessResponses from "../utils/successResponses";

class AuthController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      Helpers.validatePassword(data.password);

      data.password = await Helpers.hashPassword(data.password);
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
}

export = AuthController;
