import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const Shift = database.define("Shift", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.DATE,
        allowNull: false
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