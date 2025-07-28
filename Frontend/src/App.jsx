import { useState,useEffect } from 'react'
import Header from './components/Header/Header'
import { Button } from './components/ui/button'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './backend/auth'

function App() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState('Initializing...')
  const dispatch = useDispatch()

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
    <>
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      
      <Outlet/>
    </>
  )
}

export default App