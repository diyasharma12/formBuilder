import React, { useMemo, useState, useEffect } from 'react';

/**
 * props:
 * - data: { sentenceHtml: '<span>Hello <u>world</u></span>', options: [...] }
 * - onAnswer(answer) -> answer is { blanks: ['val1'], selectedOptions: ['opt1'] }
 */
export default function ClozeAttempt({ data, onAnswer, initialAnswer }) {
  // data: { preview, sentenceHtml, options, points }
  const [selectedOptions, setSelectedOptions] = useState(initialAnswer || []);

  useEffect(() => {
    if (initialAnswer) {
      setSelectedOptions(initialAnswer);
    }
  }, [initialAnswer]);

  const handleOptionChange = (index, checked) => {
    const newOptions = [...selectedOptions];
    if (checked) {
      newOptions[index] = true;
    } else {
      newOptions[index] = false;
    }
    setSelectedOptions(newOptions);
    onAnswer(newOptions);
  };

  if (!data) {
    return (
      <div className="text-center text-gray-500 p-8">
        <h3 className="text-lg font-semibold mb-2">No cloze question data available</h3>
        <p>This question doesn't have the required content.</p>
      </div>
    );
  }

  // Convert sentenceHtml to display format (replace underlined words with blanks)
  const displaySentence = (data.sentenceHtml || '').replace(/<u>(.*?)<\/u>/g, '_____');

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Cloze Question</h2>
        {data.preview && (
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">{data.preview}</p>
        )}
        <p className="text-sm text-pink-600 font-medium">
          ✨ Fill in the blanks by selecting the correct options below
        </p>
      </div>

      <div className="card p-8">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Complete the Sentence</h3>
          <div className="p-6 bg-gray-50 rounded-xl border-2 border-pink-200 min-h-[80px] flex items-center">
            <div className="text-gray-700 leading-relaxed text-lg">
              {displaySentence || "No sentence available"}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Each blank (_____) represents a word that needs to be filled in.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">Select the correct options:</h4>
          {data.options?.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-pink-50 transition-colors duration-200">
              <input
                type="checkbox"
                checked={selectedOptions[index] || false}
                onChange={(e) => handleOptionChange(index, e.target.checked)}
                className="w-5 h-5 text-pink-600 border-2 border-pink-300 rounded focus:ring-pink-500 focus:ring-2 transition-all duration-200"
              />
              <span className="text-gray-700 group-hover:text-pink-600 transition-colors duration-200 font-medium">
                {option}
              </span>
            </label>
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