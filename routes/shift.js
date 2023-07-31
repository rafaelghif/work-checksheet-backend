import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createShift, getActiveShifts, getShifts, updateShift } from "../controllers/shift.js";
import { createShiftRule, updateShiftRule } from "../validations/shift.js";

const shiftRouter = Router();

shiftRouter.get("/", [authVerify, getShifts]);
shiftRouter.get("/active", [authVerify, getActiveShifts]);
shiftRouter.post("/", [authVerify, createShiftRule, createShift]);
shiftRouter.patch("/", [authVerify, updateShiftRule, updateShift]);

export default shiftRouter;