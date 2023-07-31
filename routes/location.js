import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createLocationRule, updateLocationRule } from "../validations/location.js";
import { createLocation, getLocations, updateLocation } from "../controllers/location.js";

const locationRouter = Router();

locationRouter.get("/", [authVerify, getLocations]);
locationRouter.post("/", [authVerify, createLocationRule, createLocation]);
locationRouter.patch("/", [authVerify, updateLocationRule, updateLocation]);

export default locationRouter;