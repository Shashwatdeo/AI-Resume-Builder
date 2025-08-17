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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">AI Interview Platform</h1>
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
                        className=""
                    >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        New Profile
                    </Button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {profiles.length === 0 ? (
                    <div className="text-center py-12">
                        <User className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No profiles yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new interview profile.
                        </p>
                        <div className="mt-6">
                                                    <button
                            onClick={() => {
                              if (!authStatus) {
                                toast.error('Please log in to create a profile');
                                navigate('/login');
                                return;
                              }
                              setIsDialogOpen(true);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            New Profile
                        </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-gray-900">Your Interview Profiles</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Select a profile to start practicing or view your progress.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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