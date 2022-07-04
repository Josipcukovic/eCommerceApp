import mongoose, { ObjectId, Schema } from "mongoose";

interface CartItem {
  productId: ObjectId;
  quantity: number;
  totalPrice: number;
}

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "product",
    immutable: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

interface CartInput {
  items: CartItem[];
  totalPrice: number;
  userId: ObjectId;
  shipped: boolean;
}

interface CartDocument extends CartInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new mongoose.Schema(
  {
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
      immutable: true,
    },
    shipped: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model<CartDocument>("cart", cartSchema);

export { cartModel, CartInput, CartDocument, CartItem };
