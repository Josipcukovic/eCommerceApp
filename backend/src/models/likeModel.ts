import mongoose, { ObjectId } from "mongoose";

interface LikeInput {
  productId: ObjectId;
  likes: String[];
}

interface LikeDocument extends LikeInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [String],
  },
});

const likeModel = mongoose.model<LikeDocument>("like", likeSchema);

export { LikeInput, LikeDocument, likeModel };
