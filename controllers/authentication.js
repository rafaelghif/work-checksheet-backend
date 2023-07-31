import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";

export const authentication = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                isExpressValidation: true,
                data: {
                    title: "Validation Errors!",
                    message: "Validation Error!",
                    validationError: errors.array()
                }
            });
        }

        const { username, password } = req.body;

        const user = await models.User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({
                isExpressValidation: false,
                data: {
                    title: "Authentication Failed!",
                    message: "Username not found! Please contact developer!"
                }
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                isExpressValidation: false,
                data: {
                    title: "Authentication Failed!",
                    message: "Wrong password!"
                }
            });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY);

        const userData = {
            username: user.username,
            name: user.name,
            role: user.role
        };

        return res.status(200).json({
            message: `Welcome ${user.name}`,
            data: {
                token: token,
                user: userData
            }
        });
    } catch (err) {
        errorLogging(err.toString());
        return res.status(401).json({
            isExpressValidation: false,
            data: {
                title: "Something Wrong!",
                message: err.toString()
            }
        });
    }
}