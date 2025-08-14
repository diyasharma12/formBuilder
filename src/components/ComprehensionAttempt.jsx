import React, { useState, useEffect } from 'react';

export default function ComprehensionAttempt({ data, onAnswer, initialAnswer }) {
  // data: { paragraph, mcqs: [{ question, options, correctIndex }], points }
  const [answers, setAnswers] = useState(initialAnswer || {});

  useEffect(() => {
    if (initialAnswer) {
      setAnswers(initialAnswer);
    }
  }, [initialAnswer]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    const newAnswers = { ...answers, [questionIndex]: selectedOption };
    setAnswers(newAnswers);
    onAnswer(newAnswers);
  };

  if (!data) {
    return (
      <div className="text-center text-gray-500 p-8">
        <h3 className="text-lg font-semibold mb-2">No comprehension question data available</h3>
        <p>This question doesn't have the required content.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Comprehension Question</h2>
        <p className="text-sm text-pink-600 font-medium">
          ✨ Read the passage and answer the questions below
        </p>
      </div>

      <div className="card p-8">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Reading Passage</h3>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-700 leading-relaxed text-lg">
              {data.paragraph || "No passage content available."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-700">Questions:</h4>
          {data.mcqs?.map((mcq, questionIndex) => (
            <div key={questionIndex} className="p-6 border border-pink-200 rounded-xl bg-white">
              <h5 className="font-medium text-gray-800 mb-4">
                Question {questionIndex + 1}: {mcq.question}
              </h5>
              <div className="space-y-3">
                {mcq.options?.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                      className="w-4 h-4 text-pink-600 border-2 border-pink-300 focus:ring-pink-500 focus:ring-2 transition-all duration-200"
                    />
                    <span className="text-gray-700 group-hover:text-pink-600 transition-colors duration-200">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {data.points > 0 && (
          <div className="mt-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
            <p className="text-sm text-pink-700">
              <span className="font-semibold">Points:</span> {data.points}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}