import "dotenv/config";
import { validationResult } from "express-validator";
import models from "../models/index.js";
import { errorLogging } from "../helpers/error.js";
import { Op, QueryTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const createChecksheet = async (req, res) => {
    const transaction = await database.transaction();
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

        const { employee, shift, isClean, details } = req.body;

        const files = req.files;

        const checksheet = await models.Checksheet.create({
            date: new Date(),
            isClean: isClean,
            EmployeeId: employee,
            ShiftId: shift
        }, { transaction });

        for (let key in files) {
            const fileData = files[key];
            await models.ChecksheetPicture.create({
                photoUrl: fileData.filename,
                ChecksheetId: checksheet.id
            }, { transaction });
        }

        for (let detailKey in details) {
            const detail = details[detailKey];
            const checksheetDetail = await models.ChecksheetDetail.create({
                ChecksheetId: checksheet.id,
                sequence: detail.label
            }, { transaction });

            for (const key in detail.tasks) {
                const task = detail.tasks[key];
                await models.ChecksheetDetailTask.create({
                    TaskId: task,
                    sequence: detail.label,
                    ChecksheetDetailId: checksheetDetail.id
                }, { transaction });
            }

            for (const key in detail.locations) {
                const location = detail.locations[key];
                await models.ChecksheetDetailLocation.create({
                    LocationId: location,
                    ChecksheetDetailId: checksheetDetail.id
                }, { transaction });
            }
        }

        await transaction.commit();

        return res.status(200).json({
            message: `Success Create Daily Checksheet!`,
            data: null
        });
    } catch (err) {
        transaction.rollback();
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

export const getCheckSheet = async (req, res) => {
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

        const { month, year, role } = req.params;
        const { search } = req.query;

        let where = {}

        if (role === "Client" || role == "Basic") {
            where = {
                ...where,
                status: "approve"
            }
        }

        if (search) {
            where = {
                ...where,
                [Op.or]: [
                    { "$Checksheet.date$": { [Op.like]: `%${search}%` } },
                    { status: { [Op.like]: `%${search}%` } },
                    { "$Employee.employeeId$": { [Op.like]: `%${search}%` } },
                    { "$Employee.name$": { [Op.like]: `%${search}%` } },
                    { "$Shift.name$": { [Op.like]: `%${search}%` } },
                    { "$ChecksheetDetails.Locations.name$": { [Op.like]: `%${search}%` } },
                    { "$ChecksheetDetails.Tasks.name$": { [Op.like]: `%${search}%` } },
                ]
            }
        }

        if (year !== "All") {
            where = {
                ...where,
                [Op.and]: [...where[Op.and] || [], database.where(database.fn("YEAR", database.col("Checksheet.date")), year)]
            }
        }

        if (month !== "All") {
            where = {
                ...where,
                [Op.and]: [...where[Op.and] || [], database.where(database.fn("MONTH", database.col("Checksheet.date")), month)]
            }
        }

        const response = await models.Checksheet.findAll({
            where,
            order: [["createdAt", "ASC"]],
            include: [{
                model: models.ChecksheetDetail,
                attributes: ["id", "sequence"],
				order: [[models.ChecksheetDetail, "sequence", "ASC"]],
                include: [{
                    model: models.Location,
                    attributes: ["id", "name"],
                    through: {
                        attributes: []
                    }
                }, {
                    model: models.Task,
                    attributes: ["id", "name"],
                    through: {
                        attributes: []
                    }
                }]
            }, {
                model: models.Employee,
                attributes: ["id", "name", "employeeId"]
            }, {
                model: models.Shift,
                attributes: ["id", "name"]
            }, {
                model: models.ChecksheetPicture,
                attributes: ["id", "photoUrl"]
            }]
        });

        return res.status(200).json({
            message: "Success Fetch Checksheet!",
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

export const getMonthChecksheet = async (req, res) => {
    try {
        const response = await database.query("SELECT DISTINCT MONTH(date) as monthVal FROM Checksheets ORDER BY MONTH(date) ASC", { type: QueryTypes.SELECT });
        const data = response.map((data) => data.monthVal);
        return res.status(200).json({
            message: "Success Fetch Month Checksheet!",
            data: data
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

export const getYearChecksheet = async (req, res) => {
    try {
        const response = await database.query("SELECT DISTINCT YEAR(date) as yearVal FROM Checksheets ORDER BY YEAR(date) ASC", { type: QueryTypes.SELECT });
        const data = response.map((data) => data.yearVal);
        return res.status(200).json({
            message: "Success Fetch Month Checksheet!",
            data: data
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

export const approveChecksheet = async (req, res) => {
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

        const { id } = req.body;

        const response = await models.Checksheet.update({
            status: "approve",
        }, { where: { id } });

        return res.status(200).json({
            message: `Success Approve Checksheet!`,
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