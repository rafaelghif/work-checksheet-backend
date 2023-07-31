import { Router } from "express";
import { authenticationRule } from "../validations/authentication.js";
import { authentication } from "../controllers/authentication.js";

const authenticationRouter = Router();

authenticationRouter.post("/", [authenticationRule, authentication]);

export default authenticationRouter;