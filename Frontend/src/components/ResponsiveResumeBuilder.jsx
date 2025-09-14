import React, { useState, useEffect } from 'react';
import { User, FileText, Brain, Menu, X, Download, LogOut, Mail, Phone, Calendar, GraduationCap, Briefcase, Award, TrendingUp } from 'lucide-react';

const ResponsiveResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('builder');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const sections = [
    {
      id: 'builder',
      title: 'Resume Builder',
      icon: FileText,
      color: 'from-blue-500 to-purple-600',
      description: 'Create and edit your resume'
    },
    {
      id: 'templates',
      title: 'Templates',
      icon: Award,
      color: 'from-green-500 to-emerald-600',
      description: 'Choose from professional templates'
    },
    {
      id: 'ai-interview',
      title: 'AI Interview',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      description: 'Practice with AI-powered interviews'
    }
  ];

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);


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

  // Navigation functions
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Close mobile menu when section is selected
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Download resume (placeholder function)
  const downloadResume = () => {
    // Placeholder for download functionality
    alert('Download functionality will be implemented here!');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                AI Resume Builder
              </h1>
            </div>

            {/* Hamburger Menu Button - ONLY NAVIGATION */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 shadow-lg"
                aria-label="Toggle navigation menu"
                style={{ minWidth: '48px', minHeight: '48px' }}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <nav className="space-y-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`w-full flex items-center space-x-4 px-4 py-4 text-left rounded-xl transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm border-2 border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color} shadow-sm`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-base">{section.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{section.description}</div>
                </div>
                {activeSection === section.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
            
            {/* Mobile Menu Actions */}
            <div className="pt-4 mt-6 border-t border-gray-200 space-y-3">
              {/* Logout Button - Mobile */}
              <button
                onClick={() => alert('Logout functionality')}
                className="w-full flex items-center space-x-4 px-4 py-3 text-left rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-red-500">
                  <LogOut className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Logout</div>
                  <div className="text-sm text-red-400">Sign out of account</div>
                </div>
              </button>
            </div>
          </nav>
          
          {/* Current Section Indicator */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Currently viewing:</div>
            <div className="font-medium text-gray-900">
              {sections.find(s => s.id === activeSection)?.title}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Single Section Display */}
      <main className="min-h-screen bg-gray-50 overflow-x-hidden w-full max-w-full">
        {/* Resume Builder Section */}
        {activeSection === 'builder' && (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Form Section */}
                <div className="space-y-6 w-full max-w-full">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-full overflow-hidden">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>
              
              {/* Personal Info Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="Position Title"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="Degree/Certification"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Graduation Date"
                      value={edu.graduationDate}
                      onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="GPA (optional)"
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
      </div>
    </div>
        )}

        {/* Templates Section */}
        {activeSection === 'templates' && (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Resume Templates</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Choose from our collection of professionally designed resume templates. Each template is ATS-optimized and customizable to match your style.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {[1, 2, 3, 4, 5, 6].map((template) => (
                      <div key={template} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                        <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Template {template}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Professional design perfect for your industry</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Interview Section */}
        {activeSection === 'ai-interview' && (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AI Interview Practice</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Practice your interview skills with our AI-powered interview simulator. Get personalized feedback and improve your confidence.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Practice Sessions</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Behavioral questions</li>
                        <li>• Technical interviews</li>
                        <li>• Industry-specific questions</li>
                        <li>• Mock video interviews</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">AI Feedback</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Real-time analysis</li>
                        <li>• Speech pattern insights</li>
                        <li>• Confidence scoring</li>
                        <li>• Improvement suggestions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResponsiveResumeBuilder;
