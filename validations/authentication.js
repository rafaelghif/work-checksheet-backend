import { body } from "express-validator";

export const authenticationRule = [
    body("username").notEmpty().withMessage("Username cannot be null"),
    body("password").notEmpty().withMessage("Password cannot be null")
];