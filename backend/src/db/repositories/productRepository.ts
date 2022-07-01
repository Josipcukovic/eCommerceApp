import { ProductInput, productModel } from "../../models/productModel";
import { getMongoErrors } from "../../utils/errorHandlers";

class ProductRepository {
  static async save(product: ProductInput) {
    try {
      return await productModel.create(product);
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async getAllProducts() {
    return await productModel.find({});
  }

  static async getProductById(productId: string) {
    try {
      return await productModel.findById(productId);
    } catch (error) {
      return getMongoErrors(error);
    }
  }
}

export = ProductRepository;
