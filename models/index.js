import database from "../configs/databases/connection.js";
import { initialData } from "../databases/seed.js";
import { Checksheet } from "./checksheet.js";
import { ChecksheetDetail } from "./ChecksheetDetail.js";
import { ChecksheetDetailLocation } from "./ChecksheetDetailLocation.js";
import { ChecksheetDetailPicture } from "./ChecksheetDetailPicture.js";
import { ChecksheetDetailTask } from "./ChecksheetDetailTask.js";
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
models.ChecksheetDetailLocation = ChecksheetDetailLocation;
models.ChecksheetDetailPicture = ChecksheetDetailPicture;
models.ChecksheetDetailTask = ChecksheetDetailTask;

// database.sync({ force: true }).then(async () => {
//     await initialData();
// });

database.sync();

models.Employee.hasMany(models.Checksheet);
models.Checksheet.belongsTo(models.Employee);
models.Shift.hasMany(models.Checksheet);
models.Checksheet.belongsTo(models.Shift);

models.Checksheet.hasMany(models.ChecksheetDetail);
models.ChecksheetDetail.belongsTo(models.Checksheet);

models.Location.belongsToMany(models.ChecksheetDetail, { through: models.ChecksheetDetailLocation, hooks: true });
models.ChecksheetDetail.belongsToMany(models.Location, { through: models.ChecksheetDetailLocation, hooks: true });

models.Task.belongsToMany(models.ChecksheetDetail, { through: models.ChecksheetDetailTask, hooks: true });
models.ChecksheetDetail.belongsToMany(models.Task, { through: models.ChecksheetDetailTask, hooks: true });

models.ChecksheetDetail.hasMany(models.ChecksheetDetailPicture);
models.ChecksheetDetailPicture.belongsTo(models.ChecksheetDetail);

models.Task.hasMany(models.ChecksheetDetail);
models.ChecksheetDetail.belongsTo(models.Task);

export default models;