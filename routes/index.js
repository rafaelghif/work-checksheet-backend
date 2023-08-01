import { Router } from "express";
import employeeRouter from "./employee.js";
import authenticationRouter from "./authentication.js";
import locationRouter from "./location.js";
import shiftRouter from "./shift.js";
import taskRouter from "./task.js";
import checksheetRouter from "./checksheet.js";

const router = Router();

router.use("/authentication", [authenticationRouter]);
router.use("/employee", [employeeRouter]);
router.use("/location", [locationRouter]);
router.use("/shift", [shiftRouter]);
router.use("/task", [taskRouter]);
router.use("/checksheet", [checksheetRouter]);

export default router;