import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const ChecksheetDetailLocation = database.define("ChecksheetDetailLocation", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
});