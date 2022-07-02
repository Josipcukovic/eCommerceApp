import ProductRepository from "../db/repositories/productRepository";

class GeneralUtils {
  static async productExists(productId: string) {
    try {
      const product = await ProductRepository.getProductById(productId);
      if (!product) throw new Error();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export = GeneralUtils;
