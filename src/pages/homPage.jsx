import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star, CheckCircle, Zap, Shield, Users, BarChart3, ExternalLink } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-libertinus">
      {/* Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              <span className="text-2xl font-bold bg-black bg-clip-text text-transparent">
                FormBuilder
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/editor" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                Create Quiz
              </Link>
              <Link to="/preview" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                Take Quiz
              </Link>
              <Link to="/editor" className="btn-primary">
                Create Form
              </Link>
            </div>
          </div>
        </div>


      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-[#faf9f6] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center w-full">
          {/* Left Side - Content */}
          <div className="w-full mx-auto">
            <div className="flex items-center mb-4 space-x-4 text-lg">
              <span className="text-gray-700"></span>
            </div>
<h1
  className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight text-center"
  style={{ fontFamily: 'Libertinus Serif, serif' }}
>
  The{' '}
  <span className="relative inline-block">
    simplest
    <img src="/title-highlight-2.png" alt="highlight" width="200" />

  </span>{' '}
  way to create forms
</h1>


            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto text-center" style={{ fontFamily: 'Libertinus Serif, serif' }}>
              Say goodbye to boring forms. Meet FormBuilder — the free, intuitive form builder you've been looking for!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-2 justify-center">
              <Link to="/preview" className="bg-pink-600 text-white rounded-xl px-8 py-4 text-lg font-semibold hover:bg-pink-700 transition">
                Try Demo
              </Link>
              <Link to="/editor" className="bg-white border-2 border-pink-600 text-pink-600 rounded-xl px-8 py-4 text-lg font-semibold hover:bg-pink-50 transition">
                Create Quiz
              </Link>
            </div>
            <div className="text-pink-600 text-base mt-2 text-center" style={{ fontFamily: 'Libertinus Serif, serif' }}>
              Free to use • No registration required
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Human Images as Background Elements */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-16" style={{ height: "0px" }}>
        {/* Human left */}
        <img
          src="/human.png"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute left-16 -top-40 w-64 opacity-100 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        {/* Human1 right */}
        <img
          src="/human1.png"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute right-16 -top-40 w-64 opacity-100 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Features Section - Clean Cards */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Libertinus Serif, serif' }}>
              Everything You Need to Create
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              FormBuilder makes it simple for anyone to build free online forms. No need to code — just type your questions like you would in a doc.
            </p>
          </div>
          

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Libertinus Serif, serif' }}>
                Categorize Questions
              </h3>
              <p className="text-gray-600">
                Drag and drop items into categories. Perfect for sorting exercises and classification tasks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Libertinus Serif, serif' }}>
                Cloze Questions
              </h3>
              <p className="text-gray-600">
                Create fill-in-the-blank questions with multiple choice options. Great for vocabulary and grammar.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Libertinus Serif, serif' }}>
                Comprehension
              </h3>
              <p className="text-gray-600">
                Build reading comprehension with passages and multiple choice questions. Ideal for assessments.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Craft Intelligent Forms Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center ">
          {/* Left: Heading and Description */}
          <div className="md:w-1/2 w-full px-10 md:ml-16 md:flex md:flex-col md:items-center">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Libertinus Serif, serif' }}
            >
              Craft{' '}
              <span className="relative inline-block">
                intelligent
                <img
                  src="/title-highlight-2.png"
                  alt="highlight"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[100%] pointer-events-none select-none"
                  // style={{ zIndex: -1 }}
                />
              </span>{' '}
              forms
            </h2>
            <p className="text-xl text-gray-700 mb-4" style={{ fontFamily: 'Libertinus Serif, serif' }}>
              Our smart features make it easy to turn your forms into a tailored experience for every respondent.
            </p>
          </div>
          {/* Right: Image */}
          <div className="md:w-1/2 w-full flex justify-center">
            <img
              src="/smart.png"
              alt="Smart Features"
              className="w-full max-w-md w-[60%]"
            />
          </div>
        </div>

       {/* Conditional Logic Box */}
        <div className="mt-16 max-w-5xl mx-auto -mt-1 bg-gray-50 rounded-3xl shadow-xl flex flex-col items-center overflow-hidden">
          {/* Text */}
          <div className="w-full p-10">
            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: 'Libertinus Serif, serif' }}
            >
              Conditional logic
            </h3>
            <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'Libertinus Serif, serif' }}>
              Build dynamic forms that adapt based on prior inputs or external data. Show and hide blocks, insert branching, or calculate values to create a personalized form experience.
            </p>
            <div className="w-full flex justify-center">
              <img
                src="/smartquiz.png"
                alt="Conditional Logic"
                className="w-full max-w-full rounded-2xl shadow-md"
                style={{ objectFit: "cover", height: "340px" }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* Make forms uniquely yours */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center ">
          {/* Left: Heading and Description */}
          <div className="md:w-1/2 w-full px-10 md:ml-16 md:flex md:flex-col md:items-center">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Libertinus Serif, serif' }}
            >
              Make forms uniquely{' '}
              <span className="relative inline-block">
                yours.
                <img
                  src="/title-highlight-2.png"
                  alt="highlight"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[100%] pointer-events-none select-none"
                  // style={{ zIndex: -1 }}
                />
              </span>{' '}
            </h2>
            <p className="text-xl text-gray-700 mb-4" style={{ fontFamily: 'Libertinus Serif, serif' }}>
            Easily customize the design and layout and the number of quizes to fit any form to your brand.
            </p>
          </div>
          {/* Right: Image */}
          <div className="md:w-1/2 w-full flex justify-center">
            <img
              src="/customize.png"
              alt="customizable Features"
              className="w-full max-w-md w-[60%]"
            />
          </div>
        </div>
        </section>
      
      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2
          className="text-5xl font-bold mb-6 text-center"
          style={{ fontFamily: "'Libertinus Serif', serif" }}
        >
          Our users love us!
        </h2>
        <h3
          className="text-3xl mb-10 text-center font-normal"
          style={{ fontFamily: "'Libertinus Serif', serif", fontWeight: 400 }}
        >
          What Our Users Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Review 1 */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
            <img src="/boy.png" alt="Ms. Johnson" className="w-20 h-20 rounded-full mb-4 object-cover" />
            <blockquote className="italic text-gray-700 mb-3">
              "FormBuilder made me realize I'm not as creative as I thought. Now my students expect engaging quizzes every week!"
            </blockquote>
            <span className="text-pink-500 font-medium">- Ms. Johnson, Math Teacher</span>
          </div>
          {/* Review 2 */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
            <img src="/boy (1).png" alt="David Chen" className="w-20 h-20 rounded-full mb-4 object-cover" />
            <blockquote className="italic text-gray-700 mb-3">
              "I used to spend hours on boring multiple choice. Now I'm addicted to creating drag & drop questions. Send help!"
            </blockquote>
            <span className="text-pink-500 font-medium">- David Chen, HR Manager</span>
          </div>
          {/* Review 3 */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
            <img src="/boy (2).png" alt="Sarah Williams" className="w-20 h-20 rounded-full mb-4 object-cover" />
            <blockquote className="italic text-gray-700 mb-3">
              "My professor's quizzes got so good, I actually look forward to tests now. What have you done to me?!"
            </blockquote>
            <span className="text-pink-500 font-medium">- Sarah Williams, Student</span>
          </div>
          {/* Review 4 */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
            <img src="/girl (1).png" alt="Prof. Rodriguez" className="w-20 h-20 rounded-full mb-4 object-cover" />
            <blockquote className="italic text-gray-700 mb-3">
              "The pink theme is so pretty, I spend more time admiring the UI than actually creating questions. This is a problem."
            </blockquote>
            <span className="text-pink-500 font-medium">- Prof. Rodriguez, Literature</span>
          </div>
          {/* Review 5 */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
            <img src="/girl.png" alt="Alex Kim" className="w-20 h-20 rounded-full mb-4 object-cover" />
            <blockquote className="italic text-gray-700 mb-3">
              "I'm a developer who hates forms. FormBuilder made me question everything I thought I knew about UX design."
            </blockquote>
            <span className="text-pink-500 font-medium">- Alex Kim, Software Engineer</span>
          </div>
          {/* Review 6 */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
            <img src="/girl (2).png" alt="Marcus Thompson" className="w-20 h-20 rounded-full mb-4 object-cover" />
            <blockquote className="italic text-gray-700 mb-3">
              "My students think I'm a genius now. Little do they know, I just discovered the magic of FormBuilder's templates!"
            </blockquote>
            <span className="text-pink-500 font-medium">- Marcus Thompson, Art Teacher</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Libertinus Serif, serif' }}>
            Ready to Create Amazing Quizzes?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are already using FormBuilder to create engaging, interactive learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/editor" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Creating Now
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              to="/preview" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-xl border-2 border-pink-300 hover:bg-pink-50 transition-all duration-200"
            >
              Browse Examples
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: 'Libertinus Serif, serif' }}>
                  FormBuilder
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Create engaging, interactive quizzes that make learning fun and effective.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Categorize Questions</li>
                <li>Cloze Questions</li>
                <li>Comprehension</li>
                <li>Real-time Preview</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Documentation</li>
                <li>Tutorials</li>
                <li>Examples</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 FormBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
