import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";
import { Op } from "sequelize";

export const getShifts = async (req, res) => {
    try {
        const { search } = req.query;

        let where = {}

        if (search) {
            where = {
                [Op.or]: [{
                    name: { [Op.like]: `%${search}%` }
                }]
            }
        }

        const response = await models.Shift.findAll({
            order: [["name", "ASC"]],
            where
        });

        return res.status(200).json({
            message: "Success Fetch Shift!",
            data: response
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

export const getActiveShifts = async (req, res) => {
    try {
        const { search } = req.query;

        let where = {
            inActive: false
        }

        if (search) {
            where = {
                ...where,
                [Op.or]: [{
                    name: { [Op.like]: `%${search}%` }
                }]
            }
        }

        const response = await models.Shift.findAll({
            order: [["name", "ASC"]],
            where
        });

        return res.status(200).json({
            message: "Success Fetch Active Shift!",
            data: response
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

export const createShift = async (req, res) => {
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

        const { name } = req.body;
        const { username } = req.decoded;

        const response = await models.Shift.create({
            name,
            createdBy: username,
            updatedBy: username
        });

        return res.status(200).json({
            message: `Success Create Shift!`,
            data: response
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

export const updateShift = async (req, res) => {
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

        const { id, name, inActive } = req.body;
        const { username } = req.decoded;

        const response = await models.Shift.update({
            name,
            inActive,
            updatedBy: username
        }, { where: { id } });

        return res.status(200).json({
            message: `Success Update Shift!`,
            data: response
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