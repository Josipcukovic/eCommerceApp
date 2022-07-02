import { Request, Response, NextFunction } from "express";
import { ErrorStrings } from "../constants/appStrings";
import { UnauthorizedError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { config } from "../config";
import UserRepository from "../db/repositories/userRepository";

class AuthMiddleware {
  static requireAuthentication(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.ecommerceApp;
    if (!token) return next(new UnauthorizedError(ErrorStrings.NOT_EXISTING_TOKEN));

    jwt.verify(token, config.TOKEN_SECRET_STRING!, async (error: any, decodedToken: any) => {
      if (error) return next(new UnauthorizedError(ErrorStrings.INVALID_TOKEN));

      const { id } = decodedToken;

      try {
        const user = await UserRepository.getUserById(id);

        if (!user) return next(new UnauthorizedError(ErrorStrings.UNAUTHORIZED));

        return next();
      } catch (error) {
        return next(error);
      }
    });
  }

  static requireAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.ecommerceApp;
    if (!token) return next(new UnauthorizedError(ErrorStrings.NOT_EXISTING_TOKEN));

    jwt.verify(token, process.env.TOKEN_SECRET_STRING!, async (error: any, decodedToken: any) => {
      if (error) return next(new UnauthorizedError(ErrorStrings.INVALID_TOKEN));

      const userId = decodedToken.id;
      const user = await UserRepository.getUserById(userId);

      if (!user) return next(new UnauthorizedError(ErrorStrings.UNAUTHORIZED));

      if (user.role === "admin") return next();
      return next(new UnauthorizedError(ErrorStrings.UNAUTHORIZED));
    });
  }
}

export = AuthMiddleware;
