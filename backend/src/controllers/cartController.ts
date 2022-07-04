import { Request, Response, NextFunction } from "express";
import { ErrorStrings } from "../constants/appStrings";
import CartRepository from "../db/repositories/cartRepository";
import { BadRequestError, InternalServerError } from "../utils/errors";
import GeneralUtils from "../utils/generalUtils";
import Helpers from "../utils/helpers";
import SuccessResponses from "../utils/successResponses";
import { CartItem } from "../types";

class CartController {
  static async addCart(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      await Promise.all(
        data.items.map(async (item: CartItem) => {
          if (!(await GeneralUtils.productExists(item.productId)))
            return next(new BadRequestError(ErrorStrings.PRODUCT_DOESNT_EXIST));
        })
      );
      const { id } = Helpers.getCurrentUserData(req)!;
      data.userId = id;

      Helpers.cartNotEmpty(data);

      const cart = await CartRepository.save(data);
      if (!cart) throw new InternalServerError(ErrorStrings.INTERNAL_SERVER_ERROR);

      return SuccessResponses.creationSuccess(res, cart);
    } catch (error) {
      return next(error);
    }
  }

  static async getAllCarts(req: Request, res: Response, next: NextFunction) {
    const { pageSize, skip } = Helpers.getPaginationData(req);

    try {
      const { carts, cartCount } = await CartRepository.getAllCarts(pageSize, skip);
      const paginationData = await Helpers.getPaginationDetails(pageSize, cartCount);

      return SuccessResponses.okResponse(res, { carts, paginationData });
    } catch (error) {
      return next(error);
    }
  }

  static async getCart(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.params;

    try {
      const cart = await CartRepository.getCartById(cartId);
      if (!cart) throw new BadRequestError(ErrorStrings.INVALID_ID);

      return SuccessResponses.okResponse(res, cart);
    } catch (error) {
      next(error);
    }
  }

  static async updateShippedStatus(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.params;
    const { shipped } = req.body;

    try {
      if (typeof shipped !== "boolean") throw new BadRequestError(ErrorStrings.BOOLEAN_REQUIRED);

      const updated = await CartRepository.updateStatus(shipped, cartId);
      if (!updated) throw new BadRequestError(ErrorStrings.INVALID_ID);

      return SuccessResponses.okResponse(res, updated);
    } catch (error) {
      next(error);
    }
  }
}

export = CartController;
