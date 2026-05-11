import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getRenewalDate } from "../utils/helper.js";

export const createSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError("Unauthorized", 401);
    }

    const subscription = await prisma.subscription.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        currency: req.body.currency,
        frequency: req.body.frequency,
        category: req.body.category,
        paymentMethod: req.body.paymentMethod,
        userId: req.user,
        status: "active",
        startDate: new Date(req.body.startDate),
        renewalDate: getRenewalDate(req.body.startDate, req.body.frequency),
      },
    });

    ApiResponse(res, 201, {
      message: "Subscription created successfully",
      success: true,
      data: subscription,
    });
  },
);

export const getUserSubscriptions = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (req.user !== userId) {
      throw new ApiError("Unauthorized", 401);
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId,
      },
    });

    ApiResponse(res, 200, {
      message: "Subscriptions retrieved successfully",
      success: true,
      data: subscriptions,
    });
  },
);
