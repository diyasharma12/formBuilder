import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// Create a quiz
router.post("/", async (req, res) => {
  try {
    const { name, questions } = req.body;
    
    // Debug logging
    console.log("Received quiz creation request:");
    console.log("Name:", name);
    console.log("Questions:", JSON.stringify(questions, null, 2));
    
    if (!name) return res.status(400).json({ error: "name required" });
    const quiz = new Quiz({ name, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    console.error("POST /api/quizzes error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single quiz by id
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
