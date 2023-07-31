import jwt from "jsonwebtoken";
import { errorLogging } from "../helpers/error.js";

export const authVerify = async (req, res, next) => {
    try {
        const headers = req.headers;
        if (!headers.authorization) {
            return res.status(401).json({
                isExpressValidation: false,
                data: {
                    title: "No Token Provided!",
                    message: "No Token Provided, Please Re-Login"
                }
            });
        }
        const authorization = headers.authorization.split("Bearer ");
        if (authorization.length > 0) {
            const token = authorization[1];
            jwt.verify(token, process.env.JWT_KEY, async (err, result) => {
                if (err) {
                    return res.status(403).json({
                        isExpressValidation: false,
                        data: {
                            title: "Token Not Valid!",
                            message: "Token Not Valid, Please Re-Login!"
                        }
                    });
                } else {
                    req.decoded = result;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                isExpressValidation: false,
                data: {
                    title: "No Token Provided!",
                    message: "No Token Provided, Please Re-Login"
                }
            });
        }
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