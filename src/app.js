import express from "express";
import router from "./routes/routes.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(globalErrorHandler);

export default app;
