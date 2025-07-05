import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import authRouter from "./routes/authRoute";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http:localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Cannot connect to MongoDB:", error);
    process.exit(1);
  });
