import express from "express";
import { login } from "../controller/loginUser.controller.js";
import { register } from "../controller/auth.controller.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

export default userRouter;
