import "dotenv/config";
import rateLimit from "express-rate-limit";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "./models/index.js";
import router from "./routes/index.js";

const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false
});

app.use(limiter);
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const PORT = process.env.APP_PORT ?? 8080;

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});