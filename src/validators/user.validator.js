import { body, param, query } from "express-validator";
import { ROLE_VALUES } from "../constants/roles.js";

export const createUserValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(ROLE_VALUES)
    .withMessage(`Role must be one of: ${ROLE_VALUES.join(", ")}`),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

export const updateUserValidator = [
  param("id").isMongoId().withMessage("Valid user id is required"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Email must be valid"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(ROLE_VALUES)
    .withMessage(`Role must be one of: ${ROLE_VALUES.join(", ")}`),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

export const userIdParamValidator = [
  param("id").isMongoId().withMessage("Valid user id is required"),
];

export const listUsersValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  query("role")
    .optional()
    .isIn(ROLE_VALUES)
    .withMessage(`Role must be one of: ${ROLE_VALUES.join(", ")}`),
  query("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];
