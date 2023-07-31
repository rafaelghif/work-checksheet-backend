import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const Location = database.define("Location", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
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