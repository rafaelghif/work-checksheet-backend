import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const ClientCompany = database.define("ClientCompany", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    contactDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expireDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});