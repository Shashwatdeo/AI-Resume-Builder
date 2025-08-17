import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, User } from 'lucide-react';
import CreateProfileDialog from './CreateProfileDialog';
import ProfileCard from './ProfileCard';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

export default function Dashboard() {
    const [profiles, setProfiles] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        if (!authStatus) {
            console.log('User not authenticated, redirecting to login');
            navigate('/login');
            return;
        }

        const fetchProfiles = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/interview/`, {
        withCredentials: true, 
        });
        console.log('Fetched profiles:', response.data);
        
                setProfiles(response.data);
            } catch (error) {
                console.error('Error fetching profiles:', error);
                if (error.response?.status === 401) {
                    console.log('Authentication failed, redirecting to login');
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, [authStatus, navigate]);

    const handleProfileCreated = (newProfile) => {
        setProfiles([...profiles, newProfile]);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
                </div>
                
                <div className="text-center space-y-8 relative z-10">
                    <div className="relative">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                            <svg className="w-12 h-12 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </div>
                        <div className="absolute -inset-6 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Loading AI Interview Platform</h2>
                        <p className="text-lg text-gray-600">Preparing your interview profiles...</p>
                    </div>
                    
                    <div className="w-64 mx-auto">
                        <div className="bg-white/50 rounded-full h-3 shadow-inner">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            <header className="relative bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="text-center sm:text-left">
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            🚀 AI Interview Platform
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">Master your interviews with AI-powered practice</p>
                    </div>
                    <Button
                        onClick={() => {
                          console.log('Create Profile button clicked');
                          console.log('Current isDialogOpen state:', isDialogOpen);
                          console.log('Auth status:', authStatus);
                          
                          if (!authStatus) {
                            toast.error('Please log in to create a profile');
                            navigate('/login');
                            return;
                          }
                          
                          setIsDialogOpen(true);
                          console.log('Set isDialogOpen to true');
                        }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <PlusCircle className="mr-3 h-6 w-6" />
                        New Profile
                    </Button>
                </div>
            </header>

            <main className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {profiles.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="relative">
                            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                                <User className="h-16 w-16 text-indigo-600" />
                            </div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">No profiles yet</h3>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Get started by creating your first AI interview profile. Upload your resume and let AI analyze your skills!
                        </p>
                        <div className="mt-10">
                            <button
                                onClick={() => {
                                  if (!authStatus) {
                                    toast.error('Please log in to create a profile');
                                    navigate('/login');
                                    return;
                                  }
                                  setIsDialogOpen(true);
                                }}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <PlusCircle className="mr-3 h-6 w-6" />
                                Create Your First Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Interview Profiles</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Select a profile to start practicing or view your progress. Each profile is tailored to your skills and experience level.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {profiles?.map((profile) => (
                                <ProfileCard key={profile._id} profile={profile} />
                            ))}
                        </div>
                    </>
                )}
            </main>

            <CreateProfileDialog 
                isOpen={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)}
                onProfileCreated={handleProfileCreated}
            />
            <Toaster />
        </div>
    );
}