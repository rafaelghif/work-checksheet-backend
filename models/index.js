import database from "../configs/databases/connection.js";
import { initialData } from "../databases/seed.js";
import { Checksheet } from "./checksheet.js";
import { ChecksheetDetail } from "./ChecksheetDetail.js";
import { ChecksheetDetailLocation } from "./ChecksheetDetailLocation.js";
import { ChecksheetDetailTask } from "./ChecksheetDetailTask.js";
import { ChecksheetPicture } from "./ChecksheetPicture.js";
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
models.ChecksheetPicture = ChecksheetPicture;
models.ChecksheetDetailTask = ChecksheetDetailTask;

database.sync({ force: true }).then(async () => {
    await initialData();
});

// database.sync();

models.Employee.hasMany(models.Checksheet, { onDelete: "CASCADE", onUpdate: "CASCADE" });
models.Checksheet.belongsTo(models.Employee,);
models.Shift.hasMany(models.Checksheet, { onDelete: "CASCADE", onUpdate: "CASCADE" });
models.Checksheet.belongsTo(models.Shift, { onDelete: "CASCADE", onUpdate: "CASCADE" });

models.Checksheet.hasMany(models.ChecksheetDetail, { onDelete: "CASCADE", onUpdate: "CASCADE" });
models.ChecksheetDetail.belongsTo(models.Checksheet, { onDelete: "CASCADE", onUpdate: "CASCADE" });

models.Checksheet.hasMany(models.ChecksheetPicture, { onDelete: "CASCADE", onUpdate: "CASCADE" });
models.ChecksheetPicture.belongsTo(models.Checksheet, { onDelete: "CASCADE", onUpdate: "CASCADE" });

models.Location.belongsToMany(models.ChecksheetDetail, { through: models.ChecksheetDetailLocation, hooks: true, onDelete: "CASCADE", onUpdate: "CASCADE" });
models.ChecksheetDetail.belongsToMany(models.Location, { through: models.ChecksheetDetailLocation, hooks: true, onDelete: "CASCADE", onUpdate: "CASCADE" });

models.Task.belongsToMany(models.ChecksheetDetail, { through: models.ChecksheetDetailTask, hooks: true, onDelete: "CASCADE", onUpdate: "CASCADE" });
models.ChecksheetDetail.belongsToMany(models.Task, { through: models.ChecksheetDetailTask, hooks: true, onDelete: "CASCADE", onUpdate: "CASCADE" });

export default models;