import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", verifyAuth, getUsers);
userRouter.get("/:id", verifyAuth, getUser);

export default userRouter;
