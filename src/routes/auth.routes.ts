import { Router } from "express";
import {
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", handleSignUp);
authRouter.post("/sign-in", handleSignIn);
authRouter.post("/sign-out", handleSignOut);

export default authRouter;
