import { Router } from "express";
import {
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/sign-up", validate(signUpSchema), handleSignUp);
authRouter.post("/sign-in", validate(signInSchema), handleSignIn);
authRouter.post("/sign-out", handleSignOut);

export default authRouter;
