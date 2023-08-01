import { Router } from "express";
import { authVerify } from "../middlewares/auth.js";
import { createChecksheet } from "../controllers/checksheet.js";
import multer from "multer";
import { createChecksheetRule } from "../validations/checksheet.js";

const upload = multer();

const checksheetRouter = Router();

checksheetRouter.post("/create", [authVerify, upload.any(), createChecksheetRule, createChecksheet]);

export default checksheetRouter;