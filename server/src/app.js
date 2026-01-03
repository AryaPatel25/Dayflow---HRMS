import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import { config } from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: config.frontendDomain || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Serve static files from uploads directory
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../public/data/uploads"))
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DayFlow APIs" });
});

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
