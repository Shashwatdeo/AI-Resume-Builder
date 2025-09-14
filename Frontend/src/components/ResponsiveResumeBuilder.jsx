import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, User, Mail, Phone, Calendar, GraduationCap, Briefcase } from 'lucide-react';

const ResponsiveResumeBuilder = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    education: [{ institution: '', degree: '', graduationDate: '', gpa: '' }],
    skills: ''
  });

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  // Add new experience entry
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  // Add new education entry
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', graduationDate: '', gpa: '' }]
    }));
  };

  // Download resume (placeholder function)
  const downloadResume = () => {
    // Placeholder for download functionality
    alert('Download functionality will be implemented here!');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Resume Builder
              </h1>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h2>
              
              {/* Personal Info Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State/Country"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    placeholder="Brief summary of your professional background and goals"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-blue-500" />
                  Experience
                </h2>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Add Experience
                </button>
              </div>

              {formData.experience.map((exp, index) => (
                <div key={index} className="space-y-4 mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="Position Title"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <textarea
                    placeholder="Job description and achievements"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-green-500" />
                  Education
                </h2>
                <button
                  onClick={addEducation}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Add Education
                </button>
              </div>

              {formData.education.map((edu, index) => (
                <div key={index} className="space-y-4 mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Institution Name"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="Degree/Certification"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Graduation Date"
                      value={edu.graduationDate}
                      onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="GPA (optional)"
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Skills
              </h2>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="List your skills separated by commas (e.g., JavaScript, React, Node.js, Python)"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Resume Preview Section */}
          <div className="space-y-6">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Resume Preview
                </h2>
                
                {/* Resume Card */}
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-sm min-h-[600px] transform scale-90 sm:scale-100 origin-top">
                  {/* Header */}
                  <div className="text-center border-b border-gray-200 dark:border-gray-600 pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formData.name || 'Your Name'}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {formData.email && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {formData.email}
                        </div>
                      )}
                      {formData.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {formData.phone}
                        </div>
                      )}
                      {formData.location && (
                        <div className="flex items-center">
                          <span>{formData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {formData.summary && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Professional Summary
                      </h2>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {formData.summary}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {formData.experience.some(exp => exp.company || exp.position) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Experience
                      </h2>
                      {formData.experience.map((exp, index) => (
                        (exp.company || exp.position) && (
                          <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {exp.position || 'Position Title'}
                              </h3>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {exp.startDate} - {exp.endDate || 'Present'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {exp.company}
                            </p>
                            {exp.description && (
                              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {formData.education.some(edu => edu.institution || edu.degree) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Education
                      </h2>
                      {formData.education.map((edu, index) => (
                        (edu.institution || edu.degree) && (
                          <div key={index} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {edu.degree || 'Degree'}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {edu.institution}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {edu.graduationDate}
                                </span>
                                {edu.gpa && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    GPA: {edu.gpa}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {formData.skills && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.split(',').map((skill, index) => (
                          skill.trim() && (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                            >
                              {skill.trim()}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadResume}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 text-lg"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResponsiveResumeBuilder;
