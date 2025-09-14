import React, { useState } from 'react'
import { Button } from '../ui/button'
import  Logo  from './Logo'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn.jsx'
import { Menu, X } from 'lucide-react'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50">
        <nav className='w-full flex justify-between items-center p-3 sm:p-6 shadow-lg bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-b border-blue-100 relative z-50'>
          <Logo size="lg" />
      
           {
            authStatus?(
              <>
              {/* Welcome Message & User Info - Responsive */}
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {userData && (
                  <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {userData.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700 font-medium">Welcome, {userData.name}!</span>
                  </div>
                )}
                
                {/* Mobile User Avatar - Shows only on mobile */}
                {userData && (
                  <div className="sm:hidden w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 sm:p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 shadow-lg flex-shrink-0 cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
              </>
              
            ):
            (
              <div className='flex gap-2 sm:gap-4'>
               <Button asChild variant="outline" className="cursor-pointer px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl">
              <Link to="/register">Sign Up</Link>
            </Button>

            <Button asChild variant="outline" className="cursor-pointer px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl">
              <Link to="/login">Sign In</Link>
            </Button>
              </div>
            )
           }
         </nav>


         {/* Mobile Menu Panel */}
         {authStatus && (
           <div className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
             mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
           }`}>
             <div className="p-6">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                 <button
                   onClick={closeMobileMenu}
                   className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                 >
                   <X className="w-5 h-5 text-gray-600" />
                 </button>
               </div>
               
               <nav className="space-y-3">
                 {/* Dashboard */}
                 <Link
                   to="/dashboard"
                   onClick={closeMobileMenu}
                   className="w-full flex items-center space-x-4 px-4 py-4 text-left rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                 >
                   <div className="p-3 rounded-lg bg-blue-500 shadow-sm">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                     </svg>
                   </div>
                   <div className="flex-1">
                     <div className="font-semibold text-base">Dashboard</div>
                     <div className="text-sm text-gray-500 mt-1">Build your resume</div>
                   </div>
                 </Link>

                 {/* Templates */}
                 <Link
                   to="/templates"
                   onClick={closeMobileMenu}
                   className="w-full flex items-center space-x-4 px-4 py-4 text-left rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
                 >
                   <div className="p-3 rounded-lg bg-purple-500 shadow-sm">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                     </svg>
                   </div>
                   <div className="flex-1">
                     <div className="font-semibold text-base">Resume Templates</div>
                     <div className="text-sm text-gray-500 mt-1">Choose from templates</div>
                   </div>
                 </Link>

                 {/* AI Interview */}
                 <Link
                   to="/ai-interview"
                   onClick={closeMobileMenu}
                   className="w-full flex items-center space-x-4 px-4 py-4 text-left rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                 >
                   <div className="p-3 rounded-lg bg-green-500 shadow-sm">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                     </svg>
                   </div>
                   <div className="flex-1">
                     <div className="font-semibold text-base">AI Interview</div>
                     <div className="text-sm text-gray-500 mt-1">Practice interviews</div>
                   </div>
                 </Link>
                 
               </nav>
               
               {/* Logout Section */}
               <div className="pt-4 mt-6 border-t border-gray-200">
                 <div className="px-4">
                   <LogoutBtn />
                 </div>
               </div>
             </div>
           </div>
         )}
    </header>
    
  )
}

export default Header
