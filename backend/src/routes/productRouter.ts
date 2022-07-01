import express from "express";
import ProductController from "../controllers/productController";

const productRouter = express.Router();

const route = "/product";

productRouter.get(`${route}s`, ProductController.getAllProducts);
productRouter.post(route, ProductController.addProduct);

export = productRouter;
