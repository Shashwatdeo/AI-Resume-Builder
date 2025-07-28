import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ellipsis, Download, Trash2, Plus, FileText, TrendingUp, Clock, Star, Users, Award, Zap } from 'lucide-react'
import resumeService from '../../backend/resume'
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"

function Dashboard() {
  const [resumes, setResumes] = useState([])
  const [newResumeName, setNewResumeName] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [resumeToDelete, setResumeToDelete] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    const fetchResumes = async () => {
      setLoading(true)
      try {
        const response = await resumeService.getAllResumes()
        setResumes(response)
      } catch (error) {
        toast.error('Failed to load resumes')
      } finally {
        setLoading(false)
      }
    }
    fetchResumes()
  }, [])

  const handleDeleteResume = async () => {
    try {
      await resumeService.deleteResume(resumeToDelete)
      setResumes(resumes.filter(resume => resume._id !== resumeToDelete))
      toast.success('Resume deleted successfully')
    } catch (error) {
      toast.error('Failed to delete resume')
    } finally {
      setDeleteDialogOpen(false)
      setResumeToDelete(null)
    }
  }

  const getRandomGradient = (id) => {
    const gradients = [
      'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
      'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700',
      'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700',
      'bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700',
      'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700',
      'bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700',
      'bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700',
      'bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700',
    ]
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  const stats = [
    {
      title: "Total Resumes",
      value: resumes.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Success Rate",
      value: "95%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Avg. Rating",
      value: "4.9/5",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Active Users",
      value: "10K+",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Toaster richColors expand={true} />
        
        {/* Header Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Welcome Back! 👋
              </h1>
              <p className="text-xl text-gray-600 mt-2">Manage your professional resumes and track your progress</p>
            </div>
            <Button asChild className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              <Link to="/templates" className="flex items-center gap-2 text-lg">
                <Plus className="h-5 w-5" />
                Create New Resume
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/templates" className="group">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Create Resume</h3>
                      <p className="text-sm text-gray-600">Start building your professional resume</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/ats" className="group">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-r from-green-50 to-emerald-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Check ATS Score</h3>
                      <p className="text-sm text-gray-600">Optimize your resume for job applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/ai-interview" className="group">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-r from-purple-50 to-pink-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Practice Interviews</h3>
                      <p className="text-sm text-gray-600">Prepare with AI-powered questions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Resumes Section */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Resumes</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Resumes Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse border-0 shadow-lg">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-100">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Resumes Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start building your professional resume to showcase your skills and experience
                </p>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/templates" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Resume
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resumes.map((resume, index) => (
                <Card 
                  key={resume._id}
                  className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-full flex flex-col transform hover:-translate-y-2 hover:scale-105`}
                  onClick={() => navigate(`/resume/${resume._id}`)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${getRandomGradient(resume._id)} h-48 rounded-t-xl flex items-center justify-center transition-all duration-500 group-hover:opacity-90 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <FileText className="h-16 w-16 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    </div>
                  </div>
                  
                  <CardHeader className="flex-grow p-6">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                        {resume.name || 'Untitled Resume'}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Ellipsis className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              setResumeToDelete(resume._id)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <CardDescription className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(resume.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </CardDescription>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.9</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">ATS Optimized</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Delete Resume?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This action cannot be undone. This will permanently delete your resume and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
              onClick={handleDeleteResume}
            >
              Delete Resume
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Dashboard