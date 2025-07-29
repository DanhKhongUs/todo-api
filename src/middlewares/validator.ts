import Joi, { ObjectSchema } from "joi";

export const signupSchema: ObjectSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Name is required" }),
  email: Joi.string()
    .min(6)
    .required()
    .email({ tlds: { allow: false } }), // Chấp nhận mọi đuôi email
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .messages({
      "any.only":
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only":
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long",
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Please confirm your password",
    }),
});

export const acceptCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email({ tlds: { allow: false } }),
  providedCode: Joi.number().integer().required(),
});

export const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
  oldPassword: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
});

export const acceptFPCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email({ tlds: { allow: false } }),
  providedCode: Joi.number().integer().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": '"confirmPassword" is required',
  }),
});
