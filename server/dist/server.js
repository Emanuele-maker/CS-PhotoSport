import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { config } from "dotenv";
import { router as imagesRouter } from "./routes/imagesRoutes.js";
import { router as sessionRouter } from "./routes/sessionRoutes.js";
import { router as paymentRouter } from "./routes/paymentRoutes.js";
const app = express();
config();
process.env.NODE_ENV === "production" ? app.use(express.static(path.join(__dirname, "/client/build"))) : null;
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));
app.use("/images", imagesRouter);
app.use(sessionRouter);
app.use(paymentRouter);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));