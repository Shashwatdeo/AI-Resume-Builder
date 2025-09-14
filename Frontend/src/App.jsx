import { useState,useEffect } from 'react'
import Header from './components/Header/Header'
import { Button } from './components/ui/button'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './backend/auth'

function App() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState('Initializing...')
  const dispatch = useDispatch()
  const location = useLocation()
  const authStatus = useSelector((state) => state.auth.status)
  
  // Pages where Header should not be shown
  const noHeaderPages = ['/login', '/register', '/forgot-password', '/reset-password']
  const shouldShowHeader = authStatus && !noHeaderPages.some(page => location.pathname.startsWith(page))

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, message: 'Connecting to server...' },
      { progress: 40, message: 'Loading application...' },
      { progress: 60, message: 'Checking authentication...' },
      { progress: 80, message: 'Preparing interface...' },
      { progress: 100, message: 'Ready!' }
    ]

    let currentStep = 0
    const progressInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress)
        setLoadingMessage(loadingSteps[currentStep].message)
        currentStep++
      }
    }, 800)

    // Set a timeout to show the app even if auth check takes too long
    const timeoutId = setTimeout(() => {
      setLoading(false)
      clearInterval(progressInterval)
    }, 10000) // 10 second timeout

    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData:userData.user}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error('Auth check failed:', error)
      dispatch(logout())
    })
    .finally(() => {
      clearTimeout(timeoutId)
      clearInterval(progressInterval)
      setLoadingProgress(100)
      setLoadingMessage('Ready!')
      setTimeout(() => setLoading(false), 500)
    })

    return () => {
      clearTimeout(timeoutId)
      clearInterval(progressInterval)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="animate-pulse">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Resume Builder</h1>
            <p className="text-gray-600">Loading your workspace...</p>
          </div>
          
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{loadingMessage}</p>
          </div>
          
          <div className="text-xs text-gray-400 mt-8">
            <p>If this takes longer than 30 seconds, please refresh the page</p>
            <p className="mt-2">First-time visits may take 20-30 seconds due to server startup</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      {shouldShowHeader && <Header />}
      <main className="relative z-10 text-gray-900">
        <Outlet/>
      </main>
    </div>
  )
}

export default App