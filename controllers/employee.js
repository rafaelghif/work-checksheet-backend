import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";
import { Op } from "sequelize";

export const getEmployees = async (req, res) => {
    try {
        const { search } = req.query;

        let where = {}

        if (search) {
            where = {
                [Op.or]: [{
                    employeeId: { [Op.like]: `%${search}%` }
                }, {
                    name: { [Op.like]: `%${search}%` }
                }]
            }
        }

        const response = await models.Employee.findAll({
            order: [["employeeId", "ASC"]],
            where
        });

        return res.status(200).json({
            message: "Success Fetch Employee!",
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

export const createEmployee = async (req, res) => {
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

        const { employeeId, name } = req.body;
        const { username } = req.decoded;

        const response = await models.Employee.create({
            employeeId,
            name,
            createdBy: username,
            updatedBy: username
        });

        return res.status(200).json({
            message: `Success Create Employee!`,
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

export const updateEmployee = async (req, res) => {
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

        const { id, employeeId, name, inActive } = req.body;
        const { username } = req.decoded;

        const response = await models.Employee.update({
            employeeId,
            name,
            inActive,
            updatedBy: username
        }, { where: { id } });

        return res.status(200).json({
            message: `Success Update Employee!`,
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