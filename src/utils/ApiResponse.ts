import { Response } from "express";
import { ResponsePayload } from "../types/index.js";

export const ApiResponse = <T>(
  res: Response,
  statusCode: number,
  payload: ResponsePayload<T>,
) => {
  return res.status(statusCode).json(payload);
};
