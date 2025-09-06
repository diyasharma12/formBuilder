import express from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Init Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DB_ID;

// POST /api/notion/submitQuiz
router.post("/submitQuiz", async (req, res) => {
  try {
    const { quizId, quizName, submittedAt, answers, totalQuestions, answeredQuestions } = req.body;

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        QuizName: {
          title: [{ text: { content: quizName || "Untitled Quiz" } }]
        },
        QuizId: {
          rich_text: [{ text: { content: quizId || "" } }]
        },
        SubmittedAt: {
          date: { start: submittedAt || new Date().toISOString() } // Important: must match Notion date property
        },
        TotalQuestions: {
          number: totalQuestions || 0
        },
        AnsweredQuestions: {
          number: answeredQuestions || 0
        },
        Answers: {
          rich_text: [{ text: { content: JSON.stringify(answers) } }]
        }
      }
    });

    res.json({ success: true, message: "✅ Quiz submission saved to Notion" });
  } catch (error) {
    // Log full error to console
    console.error("❌ Notion Error Full:", error);
    if (error.body) {
      console.error("❌ Notion Response Body:", JSON.stringify(error.body, null, 2));
    }
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;