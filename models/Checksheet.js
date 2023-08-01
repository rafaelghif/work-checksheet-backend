import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const Checksheet = database.define("Checksheet", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isClean: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM("request", "approve"),
        allowNull: false,
        defaultValue: "request"
    }
});