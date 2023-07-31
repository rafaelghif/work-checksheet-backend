import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const Employee = database.define("Employee", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    employeeId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdBy: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    updatedBy: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
});