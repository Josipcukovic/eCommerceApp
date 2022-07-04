import express from "express";
import handleErrors from "../middlewares/errorMiddleware";
import authRouter from "./authRouter";
import cartRouter from "./cartRouter";
import likeRouter from "./likeRouter";
import productRouter from "./productRouter";

const api = express.Router();

api.use("/auth", authRouter);
api.use(productRouter);
api.use(cartRouter);
api.use(likeRouter);
api.use(handleErrors);

export = api;
