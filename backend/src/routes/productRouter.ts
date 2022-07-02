import express from "express";
import ProductController from "../controllers/productController";

const productRouter = express.Router();

const route = "/product";

productRouter.get(`${route}s`, ProductController.getAllProducts);
productRouter.get(`${route}/:productId`, ProductController.getProduct);

productRouter.post(route, ProductController.addProduct);
productRouter.post(`${route}/search`, ProductController.search);
productRouter.post(`${route}/searchName`, ProductController.searchByName);

productRouter.patch(`${route}/:productId`, ProductController.update);

productRouter.delete(`${route}/:productId`, ProductController.delete);

export = productRouter;
