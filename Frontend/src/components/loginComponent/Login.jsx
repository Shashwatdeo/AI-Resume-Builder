import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice';
import authService from '../../backend/auth';
import {Toaster,toast} from 'sonner'
import { Eye, EyeOff } from 'lucide-react';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    if (loading) return;
    setLoading(true);
    try {
      const session = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData: userData.user }));
        navigate("/");
      }
    } catch (error) {
      // Show error for authentication failures
      if (error.response?.status === 401) {
        toast.error("Invalid credentials. Please check your email and password.");
        setError("Invalid email or password. Please try again.");
      } else if (error.message && error.message.includes('Network Error')) {
        toast.error("Network error. Please check your connection.");
        setError("Unable to connect. Please check your internet connection.");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
        setError("Server is temporarily unavailable. Please try again later.");
      } else {
        toast.error("Login failed. Please try again.");
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80)' }}>
      <Toaster richColors expand={true} />
      <div className="w-full max-w-2xl mx-4">
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col md:flex-row">
            
            {/* Left Section */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600/90 to-purple-600/90 p-12 text-white">
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
                <p className="text-lg opacity-90 mb-8">
                  Build your professional resume in minutes and unlock new career opportunities.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm">Secure authentication</span>
                </div>
              </div>
            </div>
            
            {/* Right Section - Form */}
            <div className="w-full md:w-1/2 bg-white p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800">Sign In</h3>
                <p className="text-gray-500 mt-2">Access your resume dashboard</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
