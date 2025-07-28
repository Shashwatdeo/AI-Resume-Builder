import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Slider } from '../ui/slider';
import axios from 'axios';
import { DSARound } from './DSARound';
import { TechnicalRound } from './TechnicalRound';
import { ProjectRound } from './ProjectRound';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, X, FileText, Briefcase, DollarSign, Zap, Target, TrendingUp, Award, Users, Star, Play, Brain, Code, Rocket } from 'lucide-react';

function InterviewStepper({ profileData, onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "DSA Round", icon: <Code className="w-4 h-4" />, color: "from-blue-500 to-blue-600" },
    { label: "Technical Round", icon: <Brain className="w-4 h-4" />, color: "from-purple-500 to-purple-600" },
    { label: "Project Round", icon: <Rocket className="w-4 h-4" />, color: "from-green-500 to-green-600" },
  ];

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="relative">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Interview Practice</h2>
            <p className="text-gray-600">Complete all rounds to ace your interview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Live Practice</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    activeStep === index 
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110` 
                      : index < activeStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index < activeStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    step.icon
                  )}
                </button>
                <span className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                  activeStep === index ? 'text-blue-600' : index < activeStep ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mt-2 rounded-full transition-all duration-300 ${
                    index < activeStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-3 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-lg hover:shadow-xl"
      >
        <X className="w-5 h-5" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: activeStep > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeStep > 0 ? -50 : 50 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <InterviewContainer profileData={profileData} activeStep={activeStep} />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          onClick={prevStep}
          disabled={activeStep === 0}
          variant="outline"
          className="px-6 py-3 border-2 hover:bg-gray-50"
        >
          ← Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={activeStep === steps.length - 1}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

function InterviewContainer({ profileData, activeStep }) {
  return (
    <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
      {activeStep === 0 && <DSARound profileData={profileData} />}
      {activeStep === 1 && <TechnicalRound profileData={profileData} />}
      {activeStep === 2 && <ProjectRound profileData={profileData} />}
    </Card>
  );
}

function getDifficultyLevel(salary) {
  if (salary < 8) return 'Beginner';
  if (salary <= 16) return 'Intermediate';
  return 'Advanced';
}

function getDifficultyColor(level) {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function AiInterview() {
  const [showDialog, setShowDialog] = useState(false);
  const [formStep, setFormStep] = useState('form');
  const [resume, setResume] = useState(null);
  const [salaryRange, setSalaryRange] = useState(5);
  const [jobProfile, setJobProfile] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [resumePreview, setResumePreview] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const fetchProfiles = async () => {
      setLoadingProfiles(true);
      try {
        const res = await axios.get('http://localhost:8000/api/resume/userProfiles');
        setUserProfiles(res.data);
      } catch (e) {
        console.error("Error fetching profiles:", e);
        setUserProfiles([]);
      }
      setLoadingProfiles(false);
    };
    fetchProfiles();
  }, []);

  const handleAddProfile = () => {
    setShowDialog(true);
    setFormStep('form');
    setResume(null);
    setSalaryRange(5);
    setJobProfile('');
    setProfileData(null);
    setResumePreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumePreview({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    } else {
      setResumePreview(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const formData = new FormData();
      if (resume) formData.append('resume', resume);
      formData.append('salary', salaryRange.toString());
      formData.append('jobProfile', jobProfile);

      const response = await axios.post('http://localhost:8000/api/resume/userProfiles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProfileData(response.data);
      setUserProfiles((prev) => [response.data, ...prev]);
      setFormStep('profile');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to process your resume. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
  };

  const stats = [
    { label: "Success Rate", value: "95%", icon: TrendingUp, color: "text-green-600" },
    { label: "Avg. Score", value: "4.8/5", icon: Star, color: "text-yellow-600" },
    { label: "Active Users", value: "2K+", icon: Users, color: "text-blue-600" },
    { label: "Questions", value: "500+", icon: Brain, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                AI Interview Practice 🤖
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Master technical interviews with AI-powered questions tailored to your experience and skills
              </p>
            </div>
            <Button 
              onClick={handleAddProfile} 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Profile
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose AI Interview Practice?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🎯
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Questions</h3>
                <p className="text-gray-600">AI analyzes your resume to generate relevant questions</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🧠
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Feedback</h3>
                <p className="text-gray-600">Get instant evaluation and improvement suggestions</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  📈
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your performance across different rounds</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Profiles List */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Interview Profiles</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="h-4 w-4" />
              <span>Personalized for your experience</span>
            </div>
          </div>
          
          {loadingProfiles ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : userProfiles.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-12 text-center shadow-xl border-0"
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No profiles yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Create your first interview profile to start practicing with AI-powered questions tailored to your experience
              </p>
              <Button 
                onClick={handleAddProfile}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Profile
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {userProfiles.map((profile, idx) => (
                <motion.div
                  key={profile._id || idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="h-full cursor-pointer transition-all duration-300 hover:shadow-2xl border-0 bg-white overflow-hidden group"
                    onClick={() => handleCardClick(profile)}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{profile.jobProfile}</h3>
                          <p className="text-blue-100 text-sm">Interview Profile</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full border ${getDifficultyColor(profile.difficulty)}`}>
                          {profile.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{profile.salary} LPA</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          <span className="font-semibold">4.8/5</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {profile.skills?.slice(0, 4).map((skill, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200">
                            {skill}
                          </span>
                        ))}
                        {profile.skills?.length > 4 && (
                          <span className="bg-gray-50 text-gray-500 text-xs px-3 py-1 rounded-full border">
                            +{profile.skills.length - 4} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Created {new Date(profile.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                          <Play className="w-4 h-4" />
                          <span>Start Practice</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Add Profile Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border-0"
            >
              <div className="relative p-8">
                <button
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setShowDialog(false)}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                {formStep === 'form' && (
                  <>
                    <div className="text-center mb-8">
                      <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Interview Profile</h2>
                      <p className="text-gray-600">
                        Upload your resume and set preferences for personalized AI questions
                      </p>
                    </div>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                          Upload Resume (PDF/DOCX)
                        </Label>
                        <div className="mt-1">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                              {resumePreview ? (
                                <>
                                  <FileText className="w-8 h-8 text-blue-500 mb-2" />
                                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{resumePreview.name}</p>
                                  <p className="text-xs text-gray-500">{resumePreview.size}</p>
                                </>
                              ) : (
                                <>
                                  <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                  </svg>
                                  <p className="text-sm text-gray-500">
                                    <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-400">PDF or DOCX (MAX. 5MB)</p>
                                </>
                              )}
                            </div>
                            <Input 
                              id="resume" 
                              type="file" 
                              accept=".pdf,.docx"
                              onChange={handleFileChange}
                              className="hidden"
                              required
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                          Salary Expectations: <span className="font-semibold text-blue-600">{salaryRange} LPA</span>
                        </Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            defaultValue={[5]}
                            min={1}
                            max={30}
                            step={1}
                            onValueChange={(value) => setSalaryRange(value[0])}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className={`${salaryRange < 8 ? 'font-bold text-blue-600' : ''}`}>Beginner</span>
                          <span className={`${salaryRange >= 8 && salaryRange <= 16 ? 'font-bold text-blue-600' : ''}`}>Mid-level</span>
                          <span className={`${salaryRange > 16 ? 'font-bold text-blue-600' : ''}`}>Senior</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="jobProfile" className="block text-sm font-medium text-gray-700">
                          Target Job Profile
                        </Label>
                        <select
                          id="jobProfile"
                          value={jobProfile}
                          onChange={(e) => setJobProfile(e.target.value)}
                          className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">Select your job profile</option>
                          <option value="Frontend Developer">Frontend Developer</option>
                          <option value="Backend Developer">Backend Developer</option>
                          <option value="Fullstack Developer">Fullstack Developer</option>
                          <option value="Data Scientist">Data Scientist</option>
                          <option value="DevOps Engineer">DevOps Engineer</option>
                          <option value="Mobile Developer">Mobile Developer</option>
                          <option value="ML Engineer">ML Engineer</option>
                        </select>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Create Profile
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}

                {formStep === 'profile' && profileData && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Created!</h2>
                      <p className="text-gray-600">
                        We've analyzed your resume and created a personalized interview profile
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3">Job Profile</h3>
                        <p className="text-gray-700 text-lg">{profileData.jobProfile || jobProfile}</p>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3">Salary & Difficulty</h3>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center">
                            <DollarSign className="w-5 h-5 mr-2 text-gray-600" />
                            <span className="text-gray-700 font-semibold">{salaryRange} LPA</span>
                          </div>
                          <span className={`text-sm px-3 py-1 rounded-full border ${getDifficultyColor(profileData.difficulty)}`}>
                            {profileData.difficulty} Level
                          </span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3">Key Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, i) => (
                            <span key={i} className="bg-white text-purple-700 text-sm px-3 py-1 rounded-full border border-purple-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {profileData.projects?.length > 0 && (
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                          <h3 className="font-semibold text-gray-900 mb-3">Projects</h3>
                          <div className="space-y-3">
                            {profileData.projects.slice(0, 2).map((project, i) => (
                              <div key={i} className="bg-white rounded-lg p-4 border border-orange-200">
                                <h4 className="font-semibold text-gray-900">{project.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                                <div className="mt-3">
                                  <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech, j) => (
                                      <span key={j} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full border border-orange-200">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                            {profileData.projects.length > 2 && (
                              <p className="text-xs text-gray-500 text-center">
                                + {profileData.projects.length - 2} more projects
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowDialog(false)}
                        className="flex-1 py-3 border-2"
                      >
                        Close
                      </Button>
                      <Button 
                        onClick={() => {
                          setSelectedProfile(profileData);
                          setShowDialog(false);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Practice
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interview Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border-0"
            >
              <div className="overflow-y-auto p-8">
                <InterviewStepper 
                  profileData={selectedProfile} 
                  onClose={() => setSelectedProfile(null)} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AiInterview;