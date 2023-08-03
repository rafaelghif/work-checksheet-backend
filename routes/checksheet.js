import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import multer from "multer";
import { authVerify } from "../middlewares/auth.js";
import { approveChecksheet, createChecksheet, getCheckSheet, getMonthChecksheet, getYearChecksheet } from "../controllers/checksheet.js";
import { approveChecksheetRule, createChecksheetRule, getCheckSheetRule } from "../validations/checksheet.js";

const allowedImageTypes = /jpeg|jpg|png|gif|svg/;

const storage = multer.diskStorage({
    destination: "public/images/sb2",
    filename: function (req, file, cb) {

        const extName = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedImageTypes.test(file.mimetype);

        if (mimeType && extName) {
            const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
            cb(null, uniqueFilename);
        } else {
            cb(new Error("You can only upload images with jpeg, jpg, png, gif, or svg formats."));
        }
    },
});

const upload = multer({ storage });

const checksheetRouter = Router();

checksheetRouter.get("/get/year/:year/month/:month/role/:role", [authVerify, getCheckSheetRule, getCheckSheet]);
checksheetRouter.get("/year", [authVerify, getYearChecksheet]);
checksheetRouter.get("/month", [authVerify, getMonthChecksheet]);
checksheetRouter.post("/approve", [authVerify, approveChecksheetRule, approveChecksheet]);
checksheetRouter.post("/create", [upload.array("pictures[]", 15), createChecksheetRule, createChecksheet]);

export default checksheetRouter;