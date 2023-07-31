import { body } from "express-validator";

export const createEmployeeRule = [
    body("employeeId").notEmpty().withMessage("EmployeeId cannot be null!"),
    body("name").notEmpty().withMessage("Name cannot be null!"),
];

export const updateEmployeeRule = [
    body("id").notEmpty().withMessage("id cannot be null!")
        .isUUID("4").withMessage("Invalid type"),
    body("employeeId").notEmpty().withMessage("EmployeeId cannot be null!"),
    body("name").notEmpty().withMessage("Name cannot be null!"),
    body("inActive").notEmpty().withMessage("InActive cannot be null")
        .isBoolean().withMessage("Invalid type")
];