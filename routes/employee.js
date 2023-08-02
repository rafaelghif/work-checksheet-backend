import { Router } from "express";
import { createEmployee, getActiveEmployees, getEmployees, updateEmployee } from "../controllers/employee.js";
import { createEmployeeRule, updateEmployeeRule } from "../validations/employee.js";
import { authVerify } from "../middlewares/auth.js";

const employeeRouter = Router();

employeeRouter.get("/", [authVerify, getEmployees]);
employeeRouter.get("/active", [getActiveEmployees]);
employeeRouter.post("/", [authVerify, createEmployeeRule, createEmployee]);
employeeRouter.patch("/", [authVerify, updateEmployeeRule, updateEmployee]);

export default employeeRouter;