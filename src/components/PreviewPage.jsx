// src/pages/PreviewPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import QuestionNav from "../components/QuestionNav";
import CategorizeAttempt from "../components/CategorizeAttempt";
import ClozeAttempt from "../components/ClozeAttempt"; // Import ClozeAttempt
import ComprehensionAttempt from "../components/ComprehensionAttempt"; // Import ComprehensionAttempt

export default function PreviewPage() {
  const { id } = useParams(); // Get the quiz ID from the URL
  const [quiz, setQuiz] = useState(null); // Use a single state for the entire quiz object
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    // Only fetch if an ID exists
    if (id) {
      axios.get(`http://localhost:5000/api/quizzes/${id}`)
        .then(res => {
          // Format the questions and store the entire quiz object
          const formattedQuestions = res.data.questions.map(q => ({
            ...q,
            isAnswered: false,
            isMarked: false,
            answer: null, // Initialize an answer field
          }));
          setQuiz({ ...res.data, questions: formattedQuestions });
        })
        .catch(err => {
          console.error("Error fetching quiz:", err);
          setQuiz(null); // Set quiz to null on error
        });
    }
  }, [id]); // Depend on the 'id' so the effect re-runs when the quiz changes

  const updateAnswer = (index, answerData) => {
    if (!quiz) return;
    const nextQuestions = [...quiz.questions];
    nextQuestions[index].answer = answerData;
    nextQuestions[index].isAnswered = true;
    setQuiz({ ...quiz, questions: nextQuestions });
  };

  const handleSubmit = () => {
    // Collect all answers
    const answers = quiz.questions.map((q, index) => ({
      questionIndex: index,
      type: q.type,
      answer: q.answer,
      isAnswered: q.isAnswered
    }));

    const submission = {
      quizId: quiz._id,
      quizName: quiz.name,
      submittedAt: new Date().toISOString(),
      answers: answers,
      totalQuestions: quiz.questions.length,
      answeredQuestions: answers.filter(a => a.isAnswered).length
    };

    setSubmissionData(submission);
    setIsSubmitted(true);
    
    // You can also send this to your backend if needed
    console.log("Quiz submitted:", submission);
  };

  if (!quiz) {
    return <div className="p-6">Loading quiz or no quiz found...</div>;
  }

  // Show success page after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center p-6">
        <div className="card max-w-2xl w-full p-8 text-center slide-up">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Submitted! 🎉</h1>
            <p className="text-lg text-gray-600">Thank you for completing "{quiz.name}"</p>
          </div>

          <div className="bg-pink-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-pink-700 mb-3">Submission Summary</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold text-pink-600">{submissionData.totalQuestions}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Answered</p>
                <p className="text-2xl font-bold text-pink-600">{submissionData.answeredQuestions}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/preview'} 
              className="btn-primary w-full"
            >
              Take Another Quiz
            </button>
            <button 
              onClick={() => window.location.href = '/editor'} 
              className="btn-secondary w-full"
            >
              Create New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentIndex];
  const answeredCount = quiz.questions.filter(q => q.isAnswered).length;
  const totalQuestions = quiz.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header with progress */}
      <div className="bg-white border-b border-pink-100 p-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{quiz.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <div className="w-32 bg-pink-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-pink-600 font-medium">
                {answeredCount}/{totalQuestions} answered
              </span>
            </div>
            
            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={answeredCount === 0}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                answeredCount === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'btn-primary'
              }`}
            >
              {answeredCount === 0 ? 'Answer questions to submit' : 'Submit Quiz ✨'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex max-w-6xl mx-auto">
        <QuestionNav
          questions={quiz.questions}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <div className="flex-1 p-8">
          {currentQuestion?.type === "categorize" && (
            <>
              {console.log("Rendering categorize question:", currentQuestion)}
              <CategorizeAttempt
                data={currentQuestion.data}
                onAnswer={(ans) => updateAnswer(currentIndex, ans)}
                initialAnswer={currentQuestion.answer}
              />
            </>
          )}
          {currentQuestion?.type === "cloze" && (
            <ClozeAttempt
              data={currentQuestion.data}
              onAnswer={(ans) => updateAnswer(currentIndex, ans)}
              initialAnswer={currentQuestion.answer}
            />
          )}
          {currentQuestion?.type === "comprehension" && (
            <ComprehensionAttempt
              data={currentQuestion.data}
              onAnswer={(ans) => updateAnswer(currentIndex, ans)}
              initialAnswer={currentQuestion.answer}
            />
          )}
        </div>
      </div>
    </div>
  );
}