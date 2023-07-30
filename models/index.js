import database from "../configs/databases/connection.js";
import { ClientCompany } from "./ClientCompany.js";
import { User } from "./User.js";

const models = {}
models.User = User;
models.ClientCompany = ClientCompany;

database.sync({ force: true });

models.ClientCompany.hasMany(models.User);
models.User.belongsTo(models.ClientCompany);

export default models;