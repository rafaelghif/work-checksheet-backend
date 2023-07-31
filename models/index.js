import database from "../configs/databases/connection.js";
import { initialData } from "../databases/seed.js";
import { Checksheet } from "./checksheet.js";
import { ChecksheetDetail } from "./ChecksheetDetail.js";
import { Employee } from "./Employee.js";
import { Location } from "./Location.js";
import { Shift } from "./Shift.js";
import { Task } from "./Task.js";
import { User } from "./User.js";

const models = {}

models.User = User;
models.Employee = Employee;
models.Shift = Shift;
models.Checksheet = Checksheet;
models.ChecksheetDetail = ChecksheetDetail;
models.Location = Location;
models.Task = Task;

database.sync({ force: true }).then(async () => {
    await initialData();
});

models.Employee.hasMany(models.Checksheet);
models.Checksheet.belongsTo(models.Employee);
models.Location.hasMany(models.Checksheet);
models.Checksheet.belongsTo(models.Task);
models.Shift.hasMany(models.Checksheet);
models.Checksheet.belongsTo(models.Shift);

models.Checksheet.hasMany(models.ChecksheetDetail);
models.ChecksheetDetail.belongsTo(models.Checksheet);
models.Task.hasMany(models.ChecksheetDetail);
models.ChecksheetDetail.belongsTo(models.Task);

export default models;