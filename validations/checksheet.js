import { body } from "express-validator";

export const createChecksheetRule = [
    body("employee").notEmpty().withMessage("Employee cannot be null")
        .isUUID("4").withMessage("Invalid type"),
    body("shift").notEmpty().withMessage("Shift cannot be null")
        .isUUID("4").withMessage("Invalid type"),
    body("isKnowSupervisor").notEmpty().withMessage("Know supervisor cannot be null")
        .isBoolean().withMessage("Invalid Type"),
    body("isKnowClient").notEmpty().withMessage("Know Client cannot be null")
        .isBoolean().withMessage("Invalid Type"),
    body("details").isArray({ min: 7 }).withMessage("Invalid details")
];