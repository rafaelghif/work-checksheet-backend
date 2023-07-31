import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";
import { Op } from "sequelize";

export const getTasks = async (req, res) => {
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

        const response = await models.Task.findAll({
            order: [["name", "ASC"]],
            where
        });

        return res.status(200).json({
            message: "Success Fetch Tasks!",
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

export const getActiveTasks = async (req, res) => {
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

        const response = await models.Task.findAll({
            order: [["name", "ASC"]],
            where
        });

        return res.status(200).json({
            message: "Success Fetch Active Tasks!",
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


export const createTask = async (req, res) => {
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

        const response = await models.Task.create({
            name,
            createdBy: username,
            updatedBy: username
        });

        return res.status(200).json({
            message: `Success Create Task!`,
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

export const updateTask = async (req, res) => {
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

        const response = await models.Task.update({
            name,
            inActive,
            updatedBy: username
        }, { where: { id } });

        return res.status(200).json({
            message: `Success Update Task!`,
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