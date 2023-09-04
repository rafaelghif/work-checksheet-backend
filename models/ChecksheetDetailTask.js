import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const ChecksheetDetailTask = database.define("ChecksheetDetailTask", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});