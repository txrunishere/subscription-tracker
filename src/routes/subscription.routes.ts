import { Router } from "express";
import {
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  updateSubscription,
  createSubscription,
} from "../controllers/subscription.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { subscriptionSchema } from "../schemas/subscription.schema.js";

const subscriptionRouter = Router();

subscriptionRouter.use(verifyAuth);

subscriptionRouter.get("/", getSubscriptions);
subscriptionRouter.get("/:id", getSubscription);

subscriptionRouter.post("/", validate(subscriptionSchema), createSubscription);

subscriptionRouter.put("/:id", updateSubscription);

subscriptionRouter.delete("/:id", deleteSubscription);

export default subscriptionRouter;
