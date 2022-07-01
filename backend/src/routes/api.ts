import express from "express";
import handleErrors from "../middlewares/errorMiddleware";
import authRouter from "./authRouter";
import productRouter from "./productRouter";

const api = express.Router();

api.use("/auth", authRouter);
api.use(productRouter);
api.use(handleErrors);

export = api;
