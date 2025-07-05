import { NextFunction, Request, Response } from "express";

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res
      .clearCookie("Authorization")
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    next(error);
  }
};
