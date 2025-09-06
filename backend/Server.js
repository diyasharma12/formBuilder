import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";
import notionRoutes from "./routes/notionRoutes.js";
import googleSheetRoutes from "./routes/googleSheetRoutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/quizzes", quizRoutes);
app.use("/api/notion", notionRoutes);
app.use("/api/googlesheets", googleSheetRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
