import bcrypt from "bcrypt";
import AppConstants from "../constants/appConstants";
import { ErrorStrings } from "../constants/appStrings";
import { BadRequestError } from "./errors";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { config } from "../config";
import { UserDocument } from "../models/userModel";
import { JWTPayload } from "../types";
import { toInteger } from "lodash";

class Helpers {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, AppConstants.saltRounds);
  }

  static async compareHashPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  static validatePassword(password: string | undefined) {
    if ((password?.length || 0) < 6) throw new BadRequestError(ErrorStrings.INVALID_PASS_LENGTH);
  }

  static createToken(id: string, email: string) {
    return jwt.sign({ id, email }, process.env.TOKEN_SECRET_STRING!, {
      expiresIn: AppConstants.tokenExpireTime,
    });
  }

  static createCookie(res: Response, payload: string) {
    res.cookie(config.COOKIE_NAME, payload, {
      maxAge: AppConstants.cookieExpireTime,
      httpOnly: true,
    });
  }

  static getUserDataToReturn(user: UserDocument) {
    const { firstName, lastName, email, role, _id, createdAt, updatedAt } = user;
    return { firstName, lastName, email, role, _id, createdAt, updatedAt };
  }

  static getCurrentUserData(req: Request) {
    if (!req.cookies.ecommerceApp) return null;
    const userEmail = (jwt.decode(req.cookies.ecommerceApp) as JWTPayload).email;
    const userId = (jwt.decode(req.cookies.ecommerceApp) as JWTPayload).id;
    return { email: userEmail, id: userId };
  }

  static loginDataIsEmpty(data: { email: string; password: string }) {
    return !data.password || !data.email || !data.password.toString().trim() || !data.email.toString().trim();
  }

  static getPaginationData(req: Request) {
    const { pageSize, pageNumber } = req.query;

    let size = Math.abs(toInteger(pageSize));
    let number = Math.abs(toInteger(pageNumber));

    if (!size) size = AppConstants.pageSize;
    if (!number) number = AppConstants.pageNumber;

    const skip = (number - 1) * size;

    return { pageSize: size, pageNumber: number, skip };
  }

  static async getPaginationDetails(pageSize: number, totalItems: number) {
    return {
      totalItems,
      lastPageNumber: Math.ceil(totalItems / toInteger(pageSize)),
    };
  }

  static getPageData<T>(data: T[], pageNumber: number, pageSize: number) {
    let pageData = [];
    const number = (pageNumber - 1) * pageSize;

    for (let i = number; i < number + pageSize; i++) {
      if (!data[i]) break;
      pageData.push(data[i]);
    }

    return pageData;
  }
}

export = Helpers;
