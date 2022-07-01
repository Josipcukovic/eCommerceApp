import { NextFunction, Request, Response } from "express";
import { ErrorStrings } from "../constants/appStrings";
import ProductRepository from "../db/repositories/productRepository";
import { InternalServerError } from "../utils/errors";
import SuccessResponses from "../utils/successResponses";

class ProductController {
  static async addProduct(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      const product = await ProductRepository.save(data);
      if (!product) throw new InternalServerError(ErrorStrings.INTERNAL_SERVER_ERROR);

      return SuccessResponses.creationSuccess(res, product);
    } catch (error) {
      return next(error);
    }
  }
  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductRepository.getAllProducts();
      return SuccessResponses.okResponse(res, products);
    } catch (error) {
      return next(error);
    }
  }
}

export = ProductController;
