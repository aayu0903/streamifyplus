import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../backend/src/routes/auth.route.js";
import userRoutes from "../backend/src/routes/user.route.js";
import chatRoutes from "../backend/src/routes/chat.route.js";
import { connectDB } from "../backend/src/lib/db.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

let isDbConnected = false;
async function ensureDb() {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
  }
}

app.use(async (req, res, next) => {
  await ensureDb();
  next();
});

export default app;


