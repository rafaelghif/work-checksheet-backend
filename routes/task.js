import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createTask, getActiveTasks, getTasks, updateTask } from "../controllers/task.js";
import { createTaskRule, updateTaskRule } from "../validations/task.js";

const taskRouter = Router();

taskRouter.get("/", [authVerify, getTasks]);
taskRouter.get("/active", [getActiveTasks]);
taskRouter.post("/", [authVerify, createTaskRule, createTask]);
taskRouter.patch("/", [authVerify, updateTaskRule, updateTask]);

export default taskRouter;