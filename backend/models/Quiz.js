import mongoose from "mongoose";

// very flexible: allow different structures in data per question type
const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }, // Mixed allows nested objects
  answer: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { _id: true });

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: { type: [questionSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);
