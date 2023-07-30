import { DataTypes } from "sequelize";
import database from "../configs/databases/connection.js";

export const User = database.define("User", {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    role: {
        type: DataTypes.ENUM("Super User", "Admin", "Client", "Basic"),
        defaultValue: "Basic"
    }
});