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
}

export = CartRepository;
