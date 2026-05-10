import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "../config/env.js";

export const handleSignUp = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  // check if user already exists
  if (existingUser) {
    throw new ApiError("User with this email already exists!", 409);
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const token = jwt.sign({ id: user.id }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRY as any,
  });

  ApiResponse(res, 201, {
    message: "User created successfully!",
    success: true,
    data: { user, token },
  });
});

export const handleSignIn = asyncHandler(async (req, res) => {
  ApiResponse(res, 200, { message: "Sign In", success: true });
});

export const handleSignOut = asyncHandler(async (req, res) => {
  ApiResponse(res, 200, { message: "Sign Out", success: true });
});
