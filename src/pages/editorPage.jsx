// src/pages/EditorPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Plus, Save, Eye, ArrowRight, BookOpen, FileText, List } from "lucide-react";
import CategorizeEditor from "../components/CategorizeEditor";
import ClozeQuestionCard from "../components/ClozeQuestionCard";
import ComprehensionQuestionCard from "../components/ComprehensionQuestionCard";

export default function EditorPage() {
  const [quizName, setQuizName] = useState("");
  const [saving, setSaving] = useState(false);

  // each item: { type: 'categorize'|'cloze'|'comprehension', data: { ... } }
  const [questions, setQuestions] = useState([
    {
      type: "categorize",
      data: {
        description: "Sample categorization question",
        categories: ["Category 1", "Category 2"],
        items: [{ name: "Item 1", belongsTo: "Category 1" }, { name: "Item 2", belongsTo: "Category 2" }],
        points: 5,
      },
    },
    {
      type: "cloze",
      data: {
        preview: "Sample cloze question",
        sentenceHtml: "<p>This is a <strong>sample</strong> cloze question.</p>",
        options: ["sample", "example", "test"],
        points: 3,
      },
    },
    {
      type: "comprehension",
      data: {
        paragraph: "This is a sample paragraph for comprehension questions.",
        mcqs: [{ question: "What is this paragraph about?", options: ["Sample content", "Test content", "Example content"], correctIndex: 0 }],
        points: 4,
      },
    },
  ]);

  // update question data at index
  const updateQuestionData = (index, newData) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], data: newData };
      return next;
    });
  };

  // add a new question of given type after index (if afterIndex === null -> append)
  const addQuestion = (type, afterIndex = null) => {
    const newQuestionDefault = {
      categorize: {
        description: "New categorization question",
        categories: ["Category 1", "Category 2"],
        items: [{ name: "Item 1", belongsTo: "Category 1" }, { name: "Item 2", belongsTo: "Category 2" }],
        points: 5,
      },
      cloze: {
        preview: "New cloze question",
        sentenceHtml: "<p>This is a <strong>new</strong> cloze question.</p>",
        options: ["new", "fresh", "recent"],
        points: 3,
      },
      comprehension: {
        paragraph: "This is a new paragraph for comprehension questions.",
        mcqs: [{ question: "What is this new paragraph about?", options: ["New content", "Fresh content", "Recent content"], correctIndex: 0 }],
        points: 4,
      },
    }[type];

    setQuestions((prev) => {
      const next = [...prev];
      const entry = { type, data: newQuestionDefault };
      if (afterIndex == null) next.push(entry);
      else next.splice(afterIndex + 1, 0, entry);
      return next;
    });
  };

  // remove by index (renumbering handled by map index)
  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // SAVE to backend
  const saveQuiz = async () => {
    if (!quizName) {
      alert("Please provide a quiz name");
      return;
    }
    setSaving(true);
    try {
      const payload = { name: quizName, questions }; // questions is already JSON-serializable
      
      // Debug logging
      console.log("Saving quiz with payload:", JSON.stringify(payload, null, 2));
      console.log("Questions state:", questions);
      
      const res = await axios.post("http://localhost:5000/api/quizzes", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Saved:", res.data);
      alert("Quiz saved!");
    } catch (err) {
      console.error(err);
      alert("Save failed. Check server console.");
    } finally {
      setSaving(false);
    }
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case "categorize":
        return <List className="w-5 h-5" />;
      case "cloze":
        return <FileText className="w-5 h-5" />;
      case "comprehension":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case "categorize":
        return "bg-pink-50 text-pink-600 border-pink-200";
      case "cloze":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "comprehension":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Quiz Builder</h1>
                <p className="text-sm text-gray-600">Create engaging interactive quizzes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/preview" 
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
              >
                <Eye className="w-5 h-5" />
                <span>Preview Quizzes</span>
              </a>
              <a 
                href="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quiz Header Card */}
        <div className="card p-8 mb-8 fade-in">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Quiz</h2>
              <div className="flex items-center space-x-4">
                <div className="flex-1 max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Name</label>
                  <input
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    type="text"
                    placeholder="Enter a catchy quiz name..."
                    className="input-field text-lg"
                  />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{questions.length}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3 ml-8">
              <button
                onClick={saveQuiz}
                disabled={saving || !quizName.trim()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  saving || !quizName.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                <Save className="w-5 h-5" />
                <span>{saving ? "Saving..." : "Save Quiz"}</span>
              </button>
              <button
                onClick={saveQuiz}
                disabled={saving || !quizName.trim()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  saving || !quizName.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white border-2 border-pink-300 text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Eye className="w-5 h-5" />
                <span>Save & Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-8 mb-8">
          {questions.map((q, index) => {
            const commonProps = {
              index,
              data: q.data,
              onChange: (newData) => updateQuestionData(index, newData),
              addQuestion: () => addQuestion(q.type, index),
              removeQuestion: () => removeQuestion(index),
            };

            return (
              <div key={index} className="relative">
                {/* Question Type Badge */}
                <div className="absolute -top-3 left-6 z-10">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border-2 ${getQuestionTypeColor(q.type)}`}>
                    {getQuestionTypeIcon(q.type)}
                    <span className="text-sm font-medium capitalize">{q.type}</span>
                  </div>
                </div>

                {/* Question Content */}
                <div className="slide-up">
                  {q.type === "categorize" && <CategorizeEditor {...commonProps} />}
                  {q.type === "cloze" && <ClozeQuestionCard {...commonProps} />}
                  {q.type === "comprehension" && <ComprehensionQuestionCard {...commonProps} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Question Buttons */}
        <div className="card p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Add More Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => addQuestion("categorize")}
              className="group p-6 rounded-xl border-2 border-dashed border-pink-200 hover:border-pink-300 hover:bg-pink-25 transition-all duration-200"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <List className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Categorize</h4>
              <p className="text-sm text-gray-600">Drag & drop items into categories</p>
            </button>

            <button
              onClick={() => addQuestion("cloze")}
              className="group p-6 rounded-xl border-2 border-dashed border-rose-200 hover:border-rose-300 hover:bg-rose-25 transition-all duration-200"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-rose-200 to-rose-300 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Cloze</h4>
              <p className="text-sm text-gray-600">Fill in the blanks with options</p>
            </button>

            <button
              onClick={() => addQuestion("comprehension")}
              className="group p-6 rounded-xl border-2 border-dashed border-amber-200 hover:border-amber-300 hover:bg-amber-25 transition-all duration-200"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-amber-200 to-amber-300 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Comprehension</h4>
              <p className="text-sm text-gray-600">Read passage & answer questions</p>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-2xl px-8 py-4 shadow-lg border border-pink-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{questions.length}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="w-px h-8 bg-pink-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">
                {questions.filter(q => q.type === "cloze").length}
              </div>
              <div className="text-sm text-gray-600">Cloze Questions</div>
            </div>
            <div className="w-px h-8 bg-pink-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {questions.filter(q => q.type === "comprehension").length}
              </div>
              <div className="text-sm text-gray-600">Comprehension</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}