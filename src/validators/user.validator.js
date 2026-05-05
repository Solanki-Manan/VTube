import { body } from "express-validator";

export const registerValidator = [
  body("fullName")
    .trim()
    .escape()
    .notEmpty().withMessage("Full name is required"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail().withMessage("Valid email is required"),

  body("username")
    .trim()
    .escape()
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  body("password")
    .trim()
    .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
    .withMessage("Password must be at least 6 characters,with at least 1 uppercase, 1 lowercase, and 1 number"),
];

export const loginValidator = [
  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Invalid email"),

  body("username")
    .optional()
    .trim(),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required"),
];