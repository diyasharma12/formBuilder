// src/components/ClozeQuestionCard.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, HelpCircle, X, Underline } from "lucide-react";

export default function ClozeQuestionCard({ index, data, onChange, addQuestion, removeQuestion }) {
  // data: { preview, sentenceHtml, options, points }
  const [sentence, setSentence] = useState(data?.sentenceHtml || "");
  const [options, setOptions] = useState(data?.options || [""]);

  useEffect(() => {
    if (data?.sentenceHtml) {
      setSentence(data.sentenceHtml);
    }
    if (data?.options) {
      setOptions(data.options);
    }
  }, [data]);

  const setData = (patch) => onChange({ ...data, ...patch });

  // Handle sentence input and auto-generate options from underlined words
  const handleSentenceChange = (e) => {
    const newSentence = e.target.value;
    setSentence(newSentence);
    
    // Extract underlined words and set them as options
    const underlinedWords = extractUnderlinedWords(newSentence);
    setOptions(underlinedWords.length > 0 ? underlinedWords : [""]);
    
    setData({ 
      sentenceHtml: newSentence,
      options: underlinedWords.length > 0 ? underlinedWords : [""]
    });
  };

  // Extract words that are wrapped in <u> tags
  const extractUnderlinedWords = (text) => {
    const regex = /<u>(.*?)<\/u>/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    
    return matches;
  };

  // Add underline to selected text
  const addUnderline = () => {
    const textarea = document.getElementById(`sentence-${index}`);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start === end) {
      alert("Please select some text to underline");
      return;
    }
    
    const selectedText = sentence.substring(start, end);
    const beforeText = sentence.substring(0, start);
    const afterText = sentence.substring(end);
    
    const newSentence = beforeText + `<u>${selectedText}</u>` + afterText;
    setSentence(newSentence);
    
    // Update options with the new underlined word
    const underlinedWords = extractUnderlinedWords(newSentence);
    setOptions(underlinedWords.length > 0 ? underlinedWords : [""]);
    
    setData({ 
      sentenceHtml: newSentence,
      options: underlinedWords.length > 0 ? underlinedWords : [""]
    });
  };

  // Handle options change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setData({ options: newOptions });
  };

  // Add new option
  const addOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
    setData({ options: newOptions });
  };

  // Remove option
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setData({ options: newOptions });
  };

  // Get preview text (replace underlined words with blanks)
  const getPreviewText = () => {
    return sentence.replace(/<u>(.*?)<\/u>/g, '_____');
  };

  return (
    <div className="card p-8 relative fade-in">
      <div className="absolute right-6 top-6 flex flex-col gap-3">
        <a 
          href="https://help.socratease.co/lms/what-is-cloze-and-how-to-create-it" 
          target="_blank" 
          rel="noreferrer" 
          className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
        >
          <HelpCircle size={20} />
        </a>
        <div className="flex items-center space-x-2">
          <label className="text-xs text-gray-600">Points:</label>
          <input 
            type="number" 
            value={data?.points ?? 0} 
            onChange={(e) => setData({ points: Number(e.target.value) })} 
            className="w-16 input-field text-sm text-center" 
            min="0"
          />
        </div>
        <button 
          onClick={addQuestion} 
          className="p-2 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors duration-200"
        >
          <Plus size={18} />
        </button>
        <button 
          onClick={() => removeQuestion(index)} 
          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mb-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Preview</label>
          <input 
            value={data?.preview ?? ""} 
            onChange={(e) => setData({ preview: e.target.value })} 
            className="input-field" 
            placeholder="Brief description of what the student needs to do..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sentence with Underlined Words
          </label>
          <div className="flex gap-2 mb-3">
            <button 
              onClick={addUnderline}
              className="flex items-center space-x-2 px-3 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors duration-200 border border-rose-200"
            >
              <Underline size={16} />
              <span>Underline Selected Text</span>
            </button>
          </div>
          <textarea
            id={`sentence-${index}`}
            value={sentence}
            onChange={handleSentenceChange}
            className="input-field min-h-[100px] resize-none"
            placeholder="Type your sentence here. Select words and click 'Underline Selected Text' to make them blanks."
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Select any word(s) in the text above, then click "Underline Selected Text" to convert them to blanks.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Student Preview (How they'll see it)</label>
          <div className="p-4 bg-gray-50 rounded-xl border-2 border-rose-200 min-h-[60px]">
            <div className="text-gray-700 leading-relaxed text-lg">
              {getPreviewText() || "No sentence entered yet"}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Students will see this version with blanks (_____) instead of the underlined words.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Answer Options (automatically generated from underlined words)
          </label>
          <div className="space-y-3">
            {options.map((option, i) => (
              <div key={i} className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-rose-500 border-2 border-rose-300 rounded focus:ring-rose-400 focus:ring-2"
                />
                <input 
                  value={option} 
                  onChange={(e) => handleOptionChange(i, e.target.value)} 
                  className="input-field flex-1" 
                  placeholder={`Option ${i + 1}`}
                />
                {options.length > 1 && (
                  <button 
                    onClick={() => removeOption(i)} 
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors duration-200 border border-red-200"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={addOption} 
            className="mt-3 text-rose-600 hover:text-rose-700 font-medium flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Add Custom Option</span>
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
        <h4 className="font-medium text-rose-800 mb-2">💡 How to Create Cloze Questions:</h4>
        <ol className="text-sm text-rose-700 space-y-1 list-decimal list-inside">
          <li>Type your complete sentence in the text area above</li>
          <li>Select the word(s) you want to make into blanks</li>
          <li>Click "Underline Selected Text" button</li>
          <li>The selected words automatically become answer options</li>
          <li>Students will see blanks (_____) instead of the underlined words</li>
        </ol>
      </div>
    </div>
  );
}
