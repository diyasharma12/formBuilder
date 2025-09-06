import React from 'react';

const NotionIntegration = () => {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left: Text Content */}
        <div className="md:w-1/2 w-full px-4 md:px-10 mt-10 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Notion</h1>
          <p className="text-lg text-gray-700 mb-6">
            formBuilder forms embed beautifully on your Notion pages. If you already use Notion to organize your workflow, this direct integration makes it easy to keep everything in one place and automatically send new Tally form submissions right into your Notion databases.
          </p>
          <div className="bg-green-50 p-4 rounded-lg flex items-center mb-6">
            <svg
              className="w-6 h-6 text-green-600 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-800 font-semibold">Our Notion integration is available for <span className="underline">free</span>.</span>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">How it works</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                Connect to Notion
                <ul className="ml-5 mt-2 space-y-1 text-sm text-blue-600">
                  <li className="hover:underline cursor-pointer">How to map checkboxes to Notion</li>
                  <li className="hover:underline cursor-pointer">How to map a Tally field to a Person property</li>
                  <li className="hover:underline cursor-pointer">How to map a Tally field to a Relation property</li>
                </ul>
              </li>
              <li>Select a database</li>
              <li>Map your fields</li>
              <li>Activate the integration</li>
            </ol>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end">
          <img
            src="/Tally_-_Notion.webp"
            alt="Notion integration illustration"
            className="w-full max-w-sm md:max-w-md rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NotionIntegration;