import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/quizzes') // Fetch ALL quizzes
      .then(res => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching quizzes:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Quizzes</h1>
          <p className="text-lg text-gray-600">Choose a quiz to test your knowledge</p>
        </div>

        {quizzes.length > 0 ? (
          <div className="space-y-6 slide-up">
            {quizzes.map(quiz => (
              <div key={quiz._id} className="card p-6 hover:shadow-xl transition-all duration-300 group">
                <Link to={`/preview/${quiz._id}`} className="block">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-200 mb-2">
                        {quiz.name}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.questions?.length || 0} questions
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                    </div>
                    <div className="text-pink-500 group-hover:text-pink-600 transition-colors duration-200">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No quizzes found</h3>
            <p className="text-gray-600 mb-6">Create your first quiz to get started!</p>
            <Link to="/editor" className="btn-primary">
              Create New Quiz
            </Link>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/editor" className="btn-secondary">
            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}