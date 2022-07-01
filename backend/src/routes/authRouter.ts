import express, { Request, Response } from "express";
import AuthController from "../controllers/authController";
import AuthMiddleware from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.post("/register", AuthController.registerUser);

authRouter.get("/currentUser", AuthMiddleware.requireAuthentication, AuthController.getCurrentUser);
export = authRouter;
