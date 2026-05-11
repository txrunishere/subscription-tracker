import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  ApiResponse(res, 200, {
    message: "Users fetched successfully",
    success: true,
    data: users,
  });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: Array.isArray(userId) ? userId[0] : userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError("User not found!", 404);
  }

  ApiResponse(res, 200, {
    message: "User fetched successfully",
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: Array.isArray(id) ? id[0] : id,
    },
  });

  if (!user) {
    throw new ApiError("User not found!", 404);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  ApiResponse(res, 200, {
    message: "User updated successfully!",
    success: true,
    data: updatedUser,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Array.isArray(id) ? id[0] : id,
    },
  });

  if (!user) {
    throw new ApiError("User not found!", 404);
  }

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  ApiResponse(res, 204, {
    message: "User deleted successfully!",
    success: true,
  });
});
