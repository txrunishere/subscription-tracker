import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getRenewalDate } from "../utils/helper.js";

export const getSubscriptions = asyncHandler(
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

export const getSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const subscription = await prisma.subscription.findUnique({
      where: {
        id,
      },
    });

    if (!subscription) {
      throw new ApiError("Subscription not found", 404);
    }

    if (subscription.userId !== req.user) {
      throw new ApiError("Unauthorized", 401);
    }

    ApiResponse(res, 200, {
      message: "Subscription retrieved successfully",
      success: true,
      data: subscription,
    });
  },
);

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

export const updateSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const subscription = await prisma.subscription.findUnique({
      where: {
        id,
      },
    });

    if (!subscription) {
      throw new ApiError("Subscription not found", 404);
    }

    if (subscription.userId !== req.user) {
      throw new ApiError("Unauthorized", 401);
    }

    const updatedSubscription = await prisma.subscription.update({
      where: {
        id,
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        currency: req.body.currency,
        frequency: req.body.frequency,
        category: req.body.category,
        paymentMethod: req.body.paymentMethod,
        status: req.body.status,
        startDate: req.body.startDate
          ? new Date(req.body.startDate)
          : undefined,
        renewalDate: req.body.renewalDate
          ? new Date(req.body.renewalDate)
          : undefined,
      },
    });

    ApiResponse(res, 200, {
      message: "Subscription updated successfully",
      success: true,
      data: updatedSubscription,
    });
  },
);

export const deleteSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const subscription = await prisma.subscription.findUnique({
      where: {
        id,
      },
    });

    if (!subscription) {
      throw new ApiError("Subscription not found", 404);
    }

    if (subscription.userId !== req.user) {
      throw new ApiError("Unauthorized", 401);
    }

    await prisma.subscription.delete({
      where: {
        id: subscription.id,
      },
    });

    ApiResponse(res, 200, {
      message: "Subscription deleted successfully",
      success: true,
    });
  },
);
