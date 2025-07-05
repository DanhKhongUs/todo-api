import express from "express";

import { signup } from "controllers/auth/signup";
import { signin } from "controllers/auth/signin";
import { sendVerificationCode } from "controllers/auth/sendVerificationCode";
import { verifyVerificationCode } from "controllers/auth/verifyVerificationCode";
import { changePassword } from "controllers/auth/changePassword";
import { identifier } from "middlewares/identifier";
import { signout } from "controllers/auth/signout";
import { sendForgotPasswordCode } from "controllers/auth/sendForgotPasswordCode";
import { validate } from "controllers/auth/validate";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/validate", identifier, validate);
router.post("/signout", identifier, signout);

router.patch("/send-verification-code", identifier, sendVerificationCode);

router.patch("/verify-verification-code", identifier, verifyVerificationCode);

router.patch("/change-password", identifier, changePassword);

router.patch("/send-forgot-password-code", identifier, sendForgotPasswordCode);
export default router;
