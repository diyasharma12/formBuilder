// src/components/ComprehensionQuestionCard.jsx
import React from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";

export default function ComprehensionQuestionCard({
  index,
  data, // Now receives data from parent
  onChange, // Now receives update function from parent
  addQuestion,
  removeQuestion,
}) {
  // Destructure data from props
  const { paragraph, mcqs, points } = data;

  // --- All handler functions now call the parent's onChange prop ---

  const updateQuestion = (updates) => {
    onChange({ ...data, ...updates });
  };

  const updateParagraph = (value) => {
    updateQuestion({ paragraph: value });
  };

  const updatePoints = (value) => {
    updateQuestion({ points: value });
  };

  const addMcq = () => {
    const newMcqs = [...mcqs, { question: "", options: ["", ""], correctIndex: 0 }];
    updateQuestion({ mcqs: newMcqs });
  };

  const removeMcq = (mcqIndex) => {
    const newMcqs = mcqs.filter((_, i) => i !== mcqIndex);
    updateQuestion({ mcqs: newMcqs });
  };

  const updateMcqQuestion = (mcqIndex, value) => {
    const nextMcqs = [...mcqs];
    nextMcqs[mcqIndex] = { ...nextMcqs[mcqIndex], question: value };
    updateQuestion({ mcqs: nextMcqs });
  };

  const updateOption = (mcqIndex, optIndex, value) => {
    const nextMcqs = [...mcqs];
    const nextOptions = [...nextMcqs[mcqIndex].options];
    nextOptions[optIndex] = value;
    nextMcqs[mcqIndex] = { ...nextMcqs[mcqIndex], options: nextOptions };
    updateQuestion({ mcqs: nextMcqs });
  };

  const addOption = (mcqIndex) => {
    const nextMcqs = [...mcqs];
    nextMcqs[mcqIndex].options.push("");
    updateQuestion({ mcqs: nextMcqs });
  };

  const removeOption = (mcqIndex, optIndex) => {
    const nextMcqs = [...mcqs];
    nextMcqs[mcqIndex].options = nextMcqs[mcqIndex].options.filter((_, i) => i !== optIndex);
    updateQuestion({ mcqs: nextMcqs });
  };

  const setCorrectAnswer = (mcqIndex, optIndex) => {
    const nextMcqs = [...mcqs];
    nextMcqs[mcqIndex] = { ...nextMcqs[mcqIndex], correctIndex: optIndex };
    updateQuestion({ mcqs: nextMcqs });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 relative border border-gray-200">
      {/* ... (rest of the JSX is the same) ... */}
      {/* right-side toolbar: Help / Points / add-question / delete-question */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 items-center">
        <a href="https://help.socratease.co/lms/comprehension" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
          <HelpCircle size={18} />
        </a>

        <input
          type="number"
          placeholder="points"
          value={points || ""}
          onChange={(e) => updatePoints(Number(e.target.value))}
          className="w-16 border rounded px-1 text-sm"
          title="Points"
        />

        {/* SIDE + : adds a NEW Comprehension question (card) below this card */}
        <button
          onClick={() => addQuestion("comprehension", index)}
          className="p-1 rounded hover:bg-gray-100"
          title="Add another comprehension question below"
        >
          <Plus size={18} />
        </button>

        {/* SIDE trash : removes this whole comprehension card */}
        <button
          onClick={() => removeQuestion(index)}
          className="p-1 rounded hover:bg-red-100 text-red-500"
          title="Delete this comprehension question"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Title shows sequential numbering (index is 0-based so display index + 1) */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-semibold">Question {index + 1}</h2>
      </div>

      {/* Paragraph */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paragraph <span className="text-red-500">*</span>
        </label>
        <textarea
          value={paragraph}
          onChange={(e) => updateParagraph(e.target.value)}
          placeholder="Enter comprehension paragraph here..."
          rows={5}
          className="w-full border rounded p-2"
        />
      </div>

      {/* MCQs list */}
      {mcqs.map((mcq, mcqIndex) => (
        <div key={mcqIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">MCQ {mcqIndex + 1}</h3>
            <button
              onClick={() => removeMcq(mcqIndex)}
              className="p-1 rounded-full hover:bg-red-100 text-red-500"
              title="Delete MCQ"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* MCQ text */}
          <input
            type="text"
            value={mcq.question}
            onChange={(e) => updateMcqQuestion(mcqIndex, e.target.value)}
            placeholder="Enter MCQ question..."
            className="w-full border rounded p-2 mb-3"
          />

          {/* options */}
          <div className="space-y-2">
            {mcq.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`mcq-${index}-${mcqIndex}`}
                  checked={mcq.correctIndex === optIndex}
                  onChange={() => setCorrectAnswer(mcqIndex, optIndex)}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(mcqIndex, optIndex, e.target.value)}
                  placeholder={`Option ${optIndex + 1}`}
                  className="flex-1 border rounded p-2"
                />
                <button
                  onClick={() => removeOption(mcqIndex, optIndex)}
                  className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                  title="Remove option"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button onClick={() => addOption(mcqIndex)} className="text-pink-500 text-sm hover:underline">
              + Add Option
            </button>
          </div>
        </div>
      ))}

      <div>
        <button onClick={addMcq} className="mt-2 rounded-lg bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 transition-colors duration-200">
          + Add MCQ
        </button>
      </div>
    </div>
  );
}