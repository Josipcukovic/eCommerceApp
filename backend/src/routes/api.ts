import express from "express";
import handleErrors from "../middlewares/errorMiddleware";
import authRouter from "./authRouter";

const api = express.Router();

api.use("/auth", authRouter);
api.use(handleErrors);

export = api;
