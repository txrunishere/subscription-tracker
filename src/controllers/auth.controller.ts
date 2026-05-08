import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const handleSignUp = asyncHandler(async (req, res) => {
  ApiResponse(res, 200, { message: "Sign Up", success: true });
});

export const handleSignIn = asyncHandler(async (req, res) => {
  ApiResponse(res, 200, { message: "Sign In", success: true });
});

export const handleSignOut = asyncHandler(async (req, res) => {
  ApiResponse(res, 200, { message: "Sign Out", success: true });
});
