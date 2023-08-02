import "dotenv/config";
import { Sequelize } from "sequelize";

const env = process.env.APP_ENV ?? "Development";

const databaseConfig = {
    development: {
        host: process.env.DEV_DATABASE_HOST,
        port: process.env.DEV_DATABASE_PORT,
        name: process.env.DEV_DATABASE_NAME,
        username: process.env.DEV_DATABASE_USERNAME,
        password: process.env.DEV_DATABASE_PASSWORD
    },
    staging: {
        host: process.env.STAG_DATABASE_HOST,
        port: process.env.STAG_DATABASE_PORT,
        name: process.env.STAG_DATABASE_NAME,
        username: process.env.STAG_DATABASE_USERNAME,
        password: process.env.STAG_DATABASE_PASSWORD
    },
    production: {
        host: process.env.PROD_DATABASE_HOST,
        port: process.env.PROD_DATABASE_PORT,
        name: process.env.PROD_DATABASE_NAME,
        username: process.env.PROD_DATABASE_USERNAME,
        password: process.env.PROD_DATABASE_PASSWORD
    }
}

const config = databaseConfig[env];

const database = new Sequelize(config.name, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: "mysql",
    timezone: "+07:00",
    logging: env === "production" ? false : console.log
});

try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default database;