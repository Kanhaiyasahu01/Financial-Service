import { body, param, query } from "express-validator";

export const createRecordValidator = [
  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a non-negative number"),
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("date").isISO8601().withMessage("Date must be a valid ISO date"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];

export const updateRecordValidator = [
  param("id").isMongoId().withMessage("Valid record id is required"),
  body("amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount must be a non-negative number"),
  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  body("date").optional().isISO8601().withMessage("Date must be valid"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];

export const recordIdParamValidator = [
  param("id").isMongoId().withMessage("Valid record id is required"),
];

export const listRecordsValidator = [
  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  query("category").optional().isString(),
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("startDate must be a valid date"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("endDate must be a valid date"),
  query("search").optional().isString(),
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  query("sortBy")
    .optional()
    .isIn(["date", "amount", "category", "createdAt"])
    .withMessage("sortBy must be one of date, amount, category, createdAt"),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortOrder must be asc or desc"),
];
