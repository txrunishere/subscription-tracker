import { NextFunction, Request, Response } from "express";
import aj from "../config/arcjet.js";
import { ApiError } from "../utils/ApiError.js";

export const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decision = await aj.protect(req, { requested: 2 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new ApiError("Too many requests", 429);
      } else if (decision.reason.isBot()) {
        throw new ApiError("No bots allowed", 403);
      } else {
        throw new ApiError("Forbidden | Access Denied", 403);
      }
    }

    next();
  } catch (error) {
    console.log("[Arcjet Error]", error);
    next(error);
  }
};
