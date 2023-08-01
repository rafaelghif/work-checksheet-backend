import "dotenv/config";
import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";
import { Op } from "sequelize";
// import { google } from "googleapis";
// import { Readable } from "stream";
// import * as fs from "fs";

export const createChecksheet = async (req, res) => {
    try {
        // const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_DRIVE_CLIENT_ID, process.env.GOOGLE_DRIVE_CLIENT_SECRET, process.env.GOOGLE_DRIVE_REDIRECT_URI);

        // oauth2Client.setCredentials({
        //     refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN
        // });

        // const drive = google.drive({
        //     version: "v3",
        //     auth: oauth2Client
        // });

        // await drive.files.create({
        //     requestBody: {
        //         name: req.files[0].originalname,
        //         mimeType: req.files[0].mimetype,
        //         parents: ["1TxE8tRlMwL5NHnSjGU9jlclQmfTEgsTu"],
        //     },
        //     media: {
        //         mimeType: req.files[0].mimetype,
        //         body: Readable.from(req.files[0].buffer),
        //     },
        // });

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

        const { employee, shift, picture, isKnowSupervisor, isKnowClient, details } = req.body;

        const files = req.files;

        return res.status(200).json(req.body);
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