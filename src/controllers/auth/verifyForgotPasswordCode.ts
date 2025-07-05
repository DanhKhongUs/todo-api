import { NextFunction, Request, Response } from "express";
import { AppError } from "middlewares/errorHandler";
import { acceptFPCodeSchema } from "middlewares/validator";
import User from "models/userModel";
import { doHash, hmacProcess } from "utils/hashing";

export const verifyForgotPasswordCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, providedCode, newPassword } = req.body;

    const { error } = acceptFPCodeSchema.validate({
      email,
      providedCode,
      newPassword,
    });

    if (error) return next(new AppError(error.details[0].message, 400));

    const codeValue = providedCode.toString();

    const existingUser = await User.findOne({ email }).select(
      "+forgotPasswordCode +forgotPasswordCodeValidation"
    );

    if (!existingUser) return next(new AppError("User does not exists!", 401));

    if (!existingUser.verified)
      return next(new AppError("You are already verified", 401));

    if (
      typeof existingUser.forgotPasswordCode !== "string" ||
      typeof existingUser.forgotPasswordCodeValidation !== "number"
    ) {
      return next(new AppError("Something is wrong with the code!", 400));
    }

    const hmacSecret = process.env.HMAC_VERIFICATION_CODE_SECRET;
    if (!hmacSecret)
      return next(
        new AppError("Server email or HMAC secret not configured", 500)
      );

    const EXPIRATION_TIME_MS = 5 * 60 * 1000;

    if (
      Date.now() - existingUser.forgotPasswordCodeValidation >
      EXPIRATION_TIME_MS
    ) {
      return next(new AppError("Forgot password code has expired!", 400));
    }

    const hashedCodeValue = hmacProcess(codeValue.toString(), hmacSecret);

    if (hashedCodeValue === existingUser.forgotPasswordCode) {
      const hashedPassword = await doHash(newPassword, 12);
      existingUser.password = hashedPassword;
      existingUser.verified = true;
      existingUser.forgotPasswordCode = undefined;
      existingUser.forgotPasswordCodeValidation = undefined;
      await existingUser.save();
      res.status(200).json({ success: true, message: "Password updated!" });
    }
    return next(new AppError("Unexpected occurred!", 400));
  } catch (error) {
    next(error);
  }
};
