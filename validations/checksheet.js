import { body, param } from "express-validator";

export const getCheckSheetRule = [
    param("year").notEmpty().withMessage("Year cannot be null"),
    param("month").notEmpty().withMessage("Month cannot be null"),
    param("role").notEmpty().withMessage("Role cannot be null"),
];

export const approveChecksheetRule = [
    body("id").notEmpty().withMessage("Id cannot be null")
        .isUUID("4").withMessage("Invalid type"),
];

export const createChecksheetRule = [
    body("employee").notEmpty().withMessage("Employee cannot be null")
        .isUUID("4").withMessage("Invalid type"),
    body("shift").notEmpty().withMessage("Shift cannot be null")
        .isUUID("4").withMessage("Invalid type"),
    body("isClean").notEmpty().withMessage("IsClean cannot be null")
        .isBoolean().withMessage("Invalid Type"),
    body("isKnowSupervisor").notEmpty().withMessage("Know supervisor cannot be null")
        .isBoolean().withMessage("Invalid Type"),
    body("isKnowClient").notEmpty().withMessage("Know Client cannot be null")
        .isBoolean().withMessage("Invalid Type"),
    body("details").isArray({ min: 7 }).withMessage("Invalid details")
];