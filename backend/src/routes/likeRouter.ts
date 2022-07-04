import express from "express";
import LikeController from "../controllers/likeController";
import AuthMiddleware from "../middlewares/authMiddleware";

const likeRouter = express.Router();

const route = "/like";

likeRouter.get(`${route}s/:productId`, AuthMiddleware.requireAuthentication, LikeController.getLikes);
likeRouter.post(route, AuthMiddleware.requireAuthentication, LikeController.update);

export = likeRouter;
