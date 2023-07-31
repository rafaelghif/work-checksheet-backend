import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const ChecksheetDetail = database.define("ChecksheetDetail", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condition: {
        type: DataTypes.ENUM("Before", "After"),
        allowNull: false
    }
});