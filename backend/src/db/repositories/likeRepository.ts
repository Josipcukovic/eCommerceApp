import { LikeInput, likeModel } from "../../models/likeModel";
import { getMongoErrors } from "../../utils/errorHandlers";

class LikeRepository {
  static async save(like: LikeInput) {
    try {
      return await likeModel.create(like);
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async getLikes(productId: string) {
    try {
      return await likeModel.findOne({ productId });
    } catch (error) {
      return getMongoErrors(error);
    }
  }
}

export = LikeRepository;
