import { NextFunction, Request, Response } from "express";
import { ErrorStrings } from "../constants/appStrings";
import LikeRepository from "../db/repositories/likeRepository";
import { LikeDocument } from "../models/likeModel";
import { BadRequestError } from "../utils/errors";
import GeneralUtils from "../utils/generalUtils";
import Helpers from "../utils/helpers";
import SuccessResponses from "../utils/successResponses";

class LikeController {
  static async update(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;

    try {
      if (!GeneralUtils.productExists(productId)) throw new BadRequestError(ErrorStrings.NOT_EXISTING_PRODUCT);

      const { id: userId } = Helpers.getCurrentUserData(req)!;
      const productLikes = await LikeRepository.getLikes(productId);

      if (!productLikes) {
        const likeData = { productId, likes: [userId] };
        const productLikes = await LikeRepository.save(likeData);

        return SuccessResponses.creationSuccess(res, { numberOfLikes: productLikes!.likes.length });
      }
      const likes = await LikeController.handleLikes(productLikes, userId);

      return SuccessResponses.okResponse(res, { numberOfLikes: likes.length, likes });
    } catch (error) {
      return next(error);
    }
  }

  static async getLikes(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;

    try {
      const productLikes = await LikeRepository.getLikes(productId);
      if (!productLikes) throw new BadRequestError(ErrorStrings.INVALID_ID);

      return SuccessResponses.okResponse(res, { numberOfLikes: productLikes.likes.length, likes: productLikes.likes });
    } catch (error) {
      return next(error);
    }
  }

  private static userLiked(likes: string[], userId: string) {
    return likes.indexOf(userId) === -1;
  }

  private static async handleLikes(productLikes: LikeDocument, userId: string) {
    LikeController.userLiked(productLikes.likes as string[], userId)
      ? productLikes.likes.push(userId)
      : productLikes.likes.splice(productLikes.likes.indexOf(userId), 1);
    await productLikes.save();

    return [...productLikes.likes];
  }
}

export = LikeController;
