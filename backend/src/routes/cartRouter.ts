import express from "express";
import CartController from "../controllers/cartController";
import AuthMiddleware from "../middlewares/authMiddleware";

const cartRouter = express.Router();

cartRouter.post("/", AuthMiddleware.requireAuthentication, CartController.addCart);

export = cartRouter;
