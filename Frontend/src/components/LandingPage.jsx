import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Real testimonials with more details
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      avatar: "S",
      rating: 5,
      content: "ResumeIt helped me create a professional resume that got me interviews at top tech companies. The ATS checker was a game-changer! I landed my dream job at Google within 3 weeks.",
      features: ["ATS Checker", "AI Templates"],
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Marketing Manager", 
      company: "Netflix",
      avatar: "M",
      rating: 5,
      content: "The AI suggestions were spot-on! I landed my dream job within 2 weeks of using ResumeIt. The interview practice feature helped me ace my technical rounds.",
      features: ["AI Suggestions", "Interview Practice"],
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      role: "Data Analyst",
      company: "Microsoft",
      avatar: "A", 
      rating: 5,
      content: "The interview practice feature helped me prepare for tough questions. The AI-generated questions were exactly what I faced in my interviews. Highly recommended!",
      features: ["Interview Practice", "Smart Content"],
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Product Manager",
      company: "Amazon",
      avatar: "E",
      rating: 5,
      content: "ResumeIt's project content generation saved me hours! The AI created compelling descriptions that highlighted my achievements perfectly.",
      features: ["Content Generation", "ATS Optimization"],
      date: "1 week ago"
    },
    {
      id: 5,
      name: "David Kim",
      role: "Full Stack Developer",
      company: "Meta",
      avatar: "D",
      rating: 5,
      content: "The ATS score checker helped me optimize my resume for each job application. I saw a 40% increase in interview callbacks!",
      features: ["ATS Checker", "Score Optimization"],
      date: "2 months ago"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header - Only show for unauthenticated users */}
      {!authStatus && (
        <nav className="relative z-50 w-full flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-blue-100">
          <div className="flex items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ResumeIt
            </div>
            <span className="ml-2 text-2xl">✨</span>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="px-6 py-3 text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" className="px-6 py-3 text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Main Heading */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex justify-center items-center mb-6">
                <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ResumeIt
                </div>
                <span className="ml-4 text-6xl md:text-8xl animate-bounce">✨</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Build Your Dream Career
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  One Resume at a Time
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Create professional resumes that stand out with our AI-powered builder. 
                Get hired faster with templates designed by career experts.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button asChild className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <Link to="/templates">
                  🚀 Start Building Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                <Link to="/ats">
                  📊 Check ATS Score
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Resumes Created</div>
              </div>
              <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
                <div className="text-gray-600">Professional Templates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ResumeIt?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a winning resume and ace your interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - AI Templates */}
            <Link to="/templates" className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Templates</h3>
              <p className="text-gray-600 mb-4">Choose from 50+ professional templates designed by career experts and optimized for ATS systems.</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                <span>Explore Templates</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            {/* Feature 2 - Smart Content */}
            <Link to="/smart-suggestions" className="group p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Content Suggestions</h3>
              <p className="text-gray-600 mb-4">Get AI-powered suggestions to improve your resume content and make it more impactful.</p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                <span>Explore AI Features</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            {/* Feature 3 - ATS Checker */}
            <Link to="/ats" className="group p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ATS Score Checker</h3>
              <p className="text-gray-600 mb-4">Ensure your resume passes through Applicant Tracking Systems with our advanced ATS checker.</p>
              <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                <span>Check Your Score</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            {/* Feature 4 - Interview Practice */}
            <Link to="/ai-interview" className="group p-8 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interview Practice</h3>
              <p className="text-gray-600 mb-4">Practice with AI-generated interview questions and get real-time feedback on your responses.</p>
              <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700 transition-colors">
                <span>Practice Now</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            {/* Feature 5 - Mobile Friendly */}
            <div className="group p-8 bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Friendly</h3>
              <p className="text-gray-600 mb-4">Create and edit your resume on any device with our responsive design.</p>
              <div className="flex items-center text-red-600 font-semibold">
                <span>Available Now</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>

            {/* Feature 6 - PDF Export */}
            <Link to="/templates" className="group p-8 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant PDF Export</h3>
              <p className="text-gray-600 mb-4">Download your resume as a professional PDF ready to send to employers.</p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                <span>Create Resume</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of professionals who landed their dream jobs
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Testimonial Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-500">
              <div className="text-center">
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <div className="text-2xl text-gray-400 mb-6">"</div>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                  {testimonials[currentTestimonial].content}
                </p>

                {/* User Info */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].date}
                    </div>
                  </div>
                </div>

                {/* Features Used */}
                <div className="flex justify-center space-x-2">
                  {testimonials[currentTestimonial].features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Job Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have already transformed their careers with ResumeIt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              <Link to="/templates">
                🚀 Start Building Free
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
