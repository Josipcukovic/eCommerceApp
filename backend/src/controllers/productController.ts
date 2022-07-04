import { NextFunction, Request, Response } from "express";
import { AppStrings, ErrorStrings } from "../constants/appStrings";
import ProductRepository from "../db/repositories/productRepository";
import { BadRequestError, InternalServerError } from "../utils/errors";
import Helpers from "../utils/helpers";
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
    const { pageSize, skip } = Helpers.getPaginationData(req);

    try {
      const { products, productCount } = await ProductRepository.getAllProducts(pageSize, skip);
      const paginationData = await Helpers.getPaginationDetails(pageSize, productCount);

      return SuccessResponses.okResponse(res, { products, paginationData });
    } catch (error) {
      return next(error);
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;

    try {
      const product = await ProductRepository.getProductById(productId);
      if (!product) throw new BadRequestError(ErrorStrings.INVALID_ID);

      return SuccessResponses.okResponse(res, product);
    } catch (error) {
      return next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    const { category } = req.body;
    const { pageSize, skip } = Helpers.getPaginationData(req);

    try {
      const { products, productCount } = await ProductRepository.getProductsByCategory(category, pageSize, skip);
      const paginationData = await Helpers.getPaginationDetails(pageSize, productCount);

      return SuccessResponses.okResponse(res, { products, paginationData });
    } catch (error) {
      return next(error);
    }
  }

  static async searchByName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const { pageSize, pageNumber } = Helpers.getPaginationData(req);

    try {
      const { products, productCount } = await ProductRepository.getProductsByName(name, pageNumber, pageSize);
      const paginationData = await Helpers.getPaginationDetails(pageSize, productCount);

      return SuccessResponses.okResponse(res, { products, paginationData });
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const { productId } = req.params;

    try {
      const updatedProduct = await ProductRepository.updateProduct(data, productId);
      if (!updatedProduct) throw new InternalServerError(ErrorStrings.INTERNAL_SERVER_ERROR);

      return SuccessResponses.okResponse(res, AppStrings.UPDATE_SUCCESS);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;

    try {
      const deletedProduct = await ProductRepository.deleteProduct(productId);
      if (!deletedProduct) throw new BadRequestError(ErrorStrings.INVALID_ID);

      return SuccessResponses.okResponse(res, AppStrings.DELETE_SUCCESS);
    } catch (error) {
      return next(error);
    }
  }
}

export = ProductController;
