import { Router } from "express";
import { createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.post("/", createSubscription);

export default subscriptionRouter;
