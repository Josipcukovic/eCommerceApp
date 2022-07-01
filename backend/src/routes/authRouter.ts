import express from "express";
import AuthController from "../controllers/authController";
import AuthMiddleware from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);

authRouter.get("/currentUser", AuthMiddleware.requireAuthentication, AuthController.getCurrentUser);
authRouter.get("/logout", AuthController.logout);

export = authRouter;
