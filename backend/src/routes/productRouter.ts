import express from "express";
import ProductController from "../controllers/productController";
import AuthMiddleware from "../middlewares/authMiddleware";

const productRouter = express.Router();

const route = "/product";

productRouter.get(`${route}s`, ProductController.getAllProducts);
productRouter.get(`${route}/:productId`, ProductController.getProduct);

productRouter.post(route, AuthMiddleware.requireAdmin, ProductController.addProduct);
productRouter.post(`${route}/search`, ProductController.search);
productRouter.post(`${route}/searchName`, ProductController.searchByName);

productRouter.patch(`${route}/:productId`, AuthMiddleware.requireAdmin, ProductController.update);

productRouter.delete(`${route}/:productId`, AuthMiddleware.requireAdmin, ProductController.delete);

export = productRouter;
