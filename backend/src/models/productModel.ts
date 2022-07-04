import mongoose from "mongoose";
import isURL from "validator/lib/isURL";
import { Brands, ProductCategories } from "../constants/appConstants";

interface ProductInput {
  pictureUrl: string;
  name: string;
  rating: number;
  price: number;
  category: string;
  brand: string;
  discount: number;
}

interface ProductDocument extends ProductInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema({
  pictureUrl: {
    type: String,
    required: [true, "Please enter image url"],
    validate: [isURL, "Please, enter valid url"],
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ProductCategories,
  },
  brand: {
    type: String,
    required: true,
    enum: Brands,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});

const productModel = mongoose.model<ProductDocument>("product", productSchema);

export { productModel, ProductInput, ProductDocument };
