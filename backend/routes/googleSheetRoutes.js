import express from "express";
import { google } from "googleapis";
import fs from "fs";

const router = express.Router();

// Load service account credentials
const credentials = JSON.parse(fs.readFileSync("./service-account.json")); // your JSON key file

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = "1mRduBiIXJXd0f1wcCFarrhsJaaW1PnPlJ57hBBD_IAc"; // Replace with your sheet ID
const RANGE = "Sheet1!A:F"; // Adjust range to match your sheet

router.post("/submitQuiz", async (req, res) => {
  try {
    const { quizName, quizId, submittedAt, totalQuestions, answeredQuestions, answers } = req.body;

    const client = await auth.getClient();
const sheets = google.sheets({ version: "v4", auth: client });


    // Append data as a new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "RAW",
      requestBody: {
        values: [[quizName, quizId, submittedAt, totalQuestions, answeredQuestions, JSON.stringify(answers)]],
      },
    });

    res.json({ success: true, message: "✅ Quiz submission saved to Google Sheets" });
  } catch (err) {
    console.error("❌ Google Sheets Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
