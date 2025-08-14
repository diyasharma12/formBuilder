import React, { useState } from 'react';

export default function QuestionNav({ questions, currentIndex, setCurrentIndex }) {
  const answeredCount = questions.filter(q => q.isAnswered).length;
  const unansweredCount = questions.length - answeredCount;
  const markedCount = questions.filter(q => q.isMarked).length;

  // State to manage the filter selection
  const [filterState, setFilterState] = useState('All');

  // Logic to filter questions based on the selected state
  const filteredQuestions = questions.filter(q => {
    if (filterState === 'Answered') return q.isAnswered;
    if (filterState === 'Unanswered') return !q.isAnswered;
    if (filterState === 'Marked') return q.isMarked;
    return true; // 'All'
  });

  return (
    <div className="card p-6 sticky top-6 w-80">
      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-700">Filter Questions</label>
        <select
          className="input-field"
          onChange={(e) => setFilterState(e.target.value)}
          value={filterState}
        >
          <option>All</option>
          <option>Answered</option>
          <option>Unanswered</option>
          <option>Marked</option>
        </select>
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Answered:</span>
          <span className="text-sm font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">{answeredCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Unanswered:</span>
          <span className="text-sm font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">{unansweredCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Marked:</span>
          <span className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">{markedCount}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Question Navigation</h3>
        <div className="grid grid-cols-5 gap-2">
          {/* Render buttons based on filtered questions */}
          {filteredQuestions.map((q, i) => {
            // Find the original index to set the current question
            const originalIndex = questions.findIndex(originalQ => originalQ === q);

            return (
              <button
                key={originalIndex}
                onClick={() => setCurrentIndex(originalIndex)}
                className={`w-10 h-10 text-sm rounded-xl border-2 transition-all duration-200 ${
                  originalIndex === currentIndex 
                    ? 'ring-2 ring-pink-400 border-pink-400 bg-pink-50 text-pink-700 font-bold' 
                    : q.isAnswered 
                      ? 'border-pink-300 bg-pink-50 text-pink-700 hover:border-pink-400' 
                      : 'border-pink-200 bg-white text-gray-600 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                {originalIndex + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}