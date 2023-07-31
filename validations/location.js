import { body } from "express-validator";

export const createLocationRule = [
    body("name").notEmpty().withMessage("Name cannot be null!"),
];

export const updateLocationRule = [
    body("id").notEmpty().withMessage("id cannot be null!")
        .isUUID("4").withMessage("Invalid type"),
    body("name").notEmpty().withMessage("Name cannot be null!"),
    body("inActive").notEmpty().withMessage("InActive cannot be null")
        .isBoolean().withMessage("Invalid type")
];