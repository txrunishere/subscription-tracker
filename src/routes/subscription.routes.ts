import { Router } from "express";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { subscriptionSchema } from "../schemas/subscription.schema.js";

const subscriptionRouter = Router();

subscriptionRouter.post(
  "/",
  validate(subscriptionSchema),
  verifyAuth,
  createSubscription,
);

subscriptionRouter.get("/user/:id", verifyAuth, getUserSubscriptions);

export default subscriptionRouter;
