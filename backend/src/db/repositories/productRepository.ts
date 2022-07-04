import { ProductInput, productModel } from "../../models/productModel";
import { getMongoErrors } from "../../utils/errorHandlers";
import Helpers from "../../utils/helpers";

class ProductRepository {
  static async save(product: ProductInput) {
    try {
      return await productModel.create(product);
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async getAllProducts(pageSize: number, skip: number) {
    const products = await productModel.find({}).sort("-createdAt").skip(skip).limit(pageSize);

    const productCount = await productModel.countDocuments({});

    return { products, productCount };
  }

  static async getProductById(productId: string) {
    try {
      return await productModel.findById(productId);
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async getProductsByCategory(category: string, pageSize: number, skip: number) {
    const products = await productModel.find({ category }).sort("-createdAt").skip(skip).limit(pageSize);

    const productCount = await productModel.countDocuments({});
    return { products, productCount };
  }

  static async getProductsByName(name: string, pageNumber: number, pageSize: number) {
    const products = await productModel.find({ name: { $regex: name, $options: "i" } }).sort("-createdAt");

    return { products: Helpers.getPageData(products, pageNumber, pageSize), productCount: products.length };
  }

  static async updateProduct(product: ProductInput, productId: string) {
    try {
      return await productModel.findByIdAndUpdate(productId, product, { new: true });
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async deleteProduct(productId: string) {
    return await productModel.findOneAndDelete({ _id: productId });
  }
}

export = ProductRepository;
