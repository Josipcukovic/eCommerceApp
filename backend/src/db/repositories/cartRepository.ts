import { CartInput, cartModel } from "../../models/cartModel";
import { getMongoErrors } from "../../utils/errorHandlers";

class CartRepository {
  static async save(cart: CartInput) {
    try {
      return await cartModel.create(cart);
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async getAllCarts(pageSize: number, skip: number) {
    const carts = await cartModel
      .find({ shipped: false })
      .sort("-createdAt")
      .skip(skip)
      .limit(pageSize)
      .populate("items.productId");

    const cartCount = await cartModel.countDocuments({ shipped: false });

    return { carts, cartCount };
  }

  static async getCartById(cartId: string) {
    try {
      return await cartModel.findById(cartId);
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async updateStatus(shippedStatus: boolean, cartId: string) {
    try {
      return await cartModel.findByIdAndUpdate(cartId, { shipped: shippedStatus }, { new: true });
    } catch (error) {
      return getMongoErrors(error);
    }
  }
}

export = CartRepository;
