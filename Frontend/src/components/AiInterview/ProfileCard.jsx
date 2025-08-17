import { Briefcase, IndianRupee, Star, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { toast,Toaster } from 'sonner';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from 'react';

export default function ProfileCard({ profile }) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/interview/${profile._id}`, {
        withCredentials: true
      });
      
      toast.success("Profile deleted successfully");
      window.location.reload()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete profile");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
        {/* Gradient top border */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
        
         <CardHeader className="flex-row items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center space-x-4">
             <Toaster expand richColors />
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">{profile.name}</CardTitle>
              <CardDescription className="text-gray-600 font-medium">{profile.jobProfile}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 rounded-full">
              <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-semibold text-green-700">{profile.salary} LPA</span>
            </div>
            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${getDifficultyColor(profile.difficulty)}`}>
              {profile.difficulty}
            </span>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3 font-semibold">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 5).map((skill, index) => (
                <span key={index} className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 font-medium border border-indigo-200">
                  {skill}
                </span>
              ))}
              {profile.skills.length > 5 && (
                <span className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                  +{profile.skills.length - 5}
                </span>
              )}
            </div>
          </div>

          {/* Open Profile Button */}
          <div className="mt-6">
            <Button 
              onClick={() => navigate(`/profile/${profile._id}`)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              Open Profile
            </Button>
          </div>
        </CardContent>

        <CardFooter className="p-4 flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="font-medium">New Profile</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                onClick={handleDeleteClick}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the interview profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}