import React, { useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const SmartSuggestions = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      id: 'projects',
      title: 'Project Content Generation',
      description: 'AI generates impactful project descriptions and key points',
      icon: '🚀',
      color: 'from-blue-500 to-purple-600',
      details: [
        'Generate compelling project descriptions',
        'Create ATS-optimized key points',
        'Extract relevant technologies automatically',
        'Quantify achievements and results'
      ],
      action: 'Go to Resume Builder',
      link: '/templates'
    },
    {
      id: 'training',
      title: 'Training & Certification Suggestions',
      description: 'AI helps you describe your training experiences effectively',
      icon: '📚',
      color: 'from-green-500 to-emerald-600',
      details: [
        'Generate training description points',
        'Extract learned technologies',
        'Create professional summaries',
        'Optimize for ATS systems'
      ],
      action: 'Go to Resume Builder',
      link: '/templates'
    },
    {
      id: 'ats',
      title: 'ATS Score Optimization',
      description: 'AI analyzes your resume against job requirements',
      icon: '📊',
      color: 'from-purple-500 to-pink-600',
      details: [
        'Check ATS compatibility score',
        'Identify missing keywords',
        'Get specific improvement suggestions',
        'Compare against job descriptions'
      ],
      action: 'Check ATS Score',
      link: '/ats'
    },
    {
      id: 'interview',
      title: 'Interview Question Generation',
      description: 'AI creates personalized interview questions based on your profile',
      icon: '💼',
      color: 'from-yellow-500 to-orange-600',
      details: [
        'Generate DSA questions by difficulty',
        'Create technical interview questions',
        'Generate project-specific questions',
        'Get real-time feedback on answers'
      ],
      action: 'Practice Interviews',
      link: '/ai-interview'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Content Suggestions</h1>
              <p className="text-gray-600 mt-2">AI-powered features to enhance your resume and interview preparation</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/templates">Start Building Resume</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'AI Features' },
              { id: 'examples', label: 'Examples' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI-Powered Resume Enhancement
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI features help you create compelling content, optimize for ATS systems, 
                and prepare for interviews with personalized suggestions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                  <Button asChild size="sm" className="w-full">
                    <Link to={feature.link}>{feature.action}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Detailed AI Features
              </h2>
              <p className="text-lg text-gray-600">
                Explore each AI-powered feature in detail
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={feature.id} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white text-3xl`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{feature.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>

                      <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Link to={feature.link}>{feature.action}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI Suggestion Examples
              </h2>
              <p className="text-lg text-gray-600">
                See how AI can transform your resume content
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Example */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Project Description Example
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Your Input:</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded">
                      "Built a web app for task management"
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">AI Suggestions:</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-600 bg-blue-50 p-3 rounded">
                        • Developed a full-stack task management application using React.js and Node.js, improving team productivity by 40%
                      </li>
                      <li className="text-gray-600 bg-blue-50 p-3 rounded">
                        • Implemented user authentication and real-time updates using WebSocket technology
                      </li>
                      <li className="text-gray-600 bg-blue-50 p-3 rounded">
                        • Technologies: React.js, Node.js, MongoDB, Express.js, Socket.io
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ATS Example */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  ATS Score Example
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Job Requirements:</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded">
                      "React.js, TypeScript, AWS, Docker, CI/CD"
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">AI Analysis:</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-600 bg-green-50 p-3 rounded">
                        ✅ ATS Score: 85/100
                      </li>
                      <li className="text-gray-600 bg-yellow-50 p-3 rounded">
                        ⚠️ Missing: Docker, CI/CD experience
                      </li>
                      <li className="text-gray-600 bg-blue-50 p-3 rounded">
                        💡 Add containerization and deployment experience
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSuggestions; 