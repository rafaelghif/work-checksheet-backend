import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import multer from "multer";
import { authVerify } from "../middlewares/auth.js";
import { approveChecksheet, createChecksheet, getCheckSheet, getMonthChecksheet, getYearChecksheet } from "../controllers/checksheet.js";
import { approveChecksheetRule, createChecksheetRule, getCheckSheetRule } from "../validations/checksheet.js";

const storage = multer.diskStorage({
    destination: 'public/images/sb2',
    filename: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif|svg/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const originalName = file.originalname;
        const uniqueFilename = `${uuidv4()}${path.extname(originalName)}`;

        if (extName) {
            cb(null, uniqueFilename);
        } else {
            cb("Error: You can Only Upload Images!!");
        }
    },
});

const upload = multer({ storage });

const checksheetRouter = Router();

checksheetRouter.get("/get/year/:year/month/:month/role/:role", [authVerify, getCheckSheetRule, getCheckSheet]);
checksheetRouter.get("/year", [authVerify, getYearChecksheet]);
checksheetRouter.get("/month", [authVerify, getMonthChecksheet]);
checksheetRouter.post("/approve", [authVerify, approveChecksheetRule, approveChecksheet]);
checksheetRouter.post("/create", [authVerify, upload.array("pictures[]", 15), createChecksheetRule, createChecksheet]);

export default checksheetRouter;