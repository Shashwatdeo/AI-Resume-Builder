import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice';
import authService from '../../backend/auth';
import { Eye, EyeOff } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // console.log(formData);
      
      const session = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (session && session.data && session.data.success) {
        // Show success message and redirect to login
        setError("");
        // You could add a success state here if needed
        navigate("/login", { 
          state: { 
            message: "Account created successfully! Please log in.",
            type: "success" 
          } 
        });
      } else {
        setError(session?.data?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.errors && errorData.errors.length > 0) {
          // Display specific validation errors
          const errorMessages = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
          setError(`Validation failed: ${errorMessages}`);
        } else if (errorData.message) {
          setError(errorData.message);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Registration failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-400/25 to-pink-400/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div> 
      
      <div className="w-full max-w-2xl mx-4">
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col md:flex-row">
            
            {/* Left Section - Welcome Panel */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-600/90 to-pink-600/90 p-12 text-white">
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-4">Join Us Today</h2>
                <p className="text-lg opacity-90 mb-8">
                  Create your account and start building professional resumes that get you hired.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm">Professional templates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm">ATS optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm">AI-powered suggestions</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Section - Registration Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-2">Create Account</h2>
                <p className="text-gray-700">Join us to build your professional resume</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <div className="text-xs text-gray-500 mb-1">
                      2-50 characters, letters and spaces only
                    </div>
                    <div className="relative">
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Joe"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg 
                            className="h-5 w-5 text-gray-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path 
                            fillRule="evenodd" 
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Must be 6+ characters with uppercase, lowercase, and number
                    </div>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-500">
                Already have an account? {' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
