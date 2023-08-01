import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const ChecksheetPicture = database.define("ChecksheetPicture", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
});