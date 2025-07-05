import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/userModel";
import { AppError } from "middlewares/errorHandler";

interface JwtPayload {
  userId: string;
  email: string;
  verified: boolean;
}

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["Authorization"];
    if (!token) {
      return next(new AppError("Not logged in", 401));
    }

    const secret = process.env.TOKEN_SECRET;
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      secret!
    ) as JwtPayload;

    // Truy vấn người dùng từ DB để lấy đầy đủ thông tin
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
