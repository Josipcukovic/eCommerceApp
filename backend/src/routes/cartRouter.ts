import express from "express";
import CartController from "../controllers/cartController";
import AuthMiddleware from "../middlewares/authMiddleware";

const cartRouter = express.Router();

const route = "/cart";

cartRouter.get(`${route}s`, AuthMiddleware.requireAdmin, CartController.getAllCarts);
cartRouter.get(`${route}/:cartId`, AuthMiddleware.requireAdmin, CartController.getCart);

cartRouter.post(route, AuthMiddleware.requireAuthentication, CartController.addCart);

cartRouter.patch(`${route}/:cartId`, AuthMiddleware.requireAdmin, CartController.updateShippedStatus);

export = cartRouter;
