import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError("Unauthorized", 401);
    }

    const decodedToken = jwt.verify(
      token,
      JWT_SECRET as string,
    ) as JwtPayload & { id: string };

    if (!decodedToken) {
      throw new ApiError("Invalid or expired token", 401);
    }

    req.user = decodedToken.id;

    next();
  } catch (error) {
    next(new ApiError("Invalid or expired token", 401));
  }
};
