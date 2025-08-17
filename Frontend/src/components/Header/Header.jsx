import React from 'react'
import { Button } from '../ui/button'
import  Logo  from './Logo'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn.jsx'

function Header() {

  const authStatus = useSelector((state) => state.auth.status);

  return (
    <header>
        <nav className='w-full flex justify-between items-center p-6 shadow-lg bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-b border-blue-100'>
          <Logo size="lg" />
      
           {
            authStatus?(
              <>
              <div className='flex gap-6 items-center'>
                <Button asChild variant="ghost" className="cursor-pointer text-lg font-semibold px-6 py-3 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 rounded-xl">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                    </svg>
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="cursor-pointer text-lg font-semibold px-6 py-3 hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 rounded-xl">
                  <Link to="/templates" className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    Resume Templates
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="cursor-pointer text-lg font-semibold px-6 py-3 hover:bg-green-100 hover:text-green-700 transition-all duration-300 rounded-xl">
                  <Link to="/ai-interview" className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    AI Interview
                  </Link>
                </Button>
              </div>
              <div>
                <LogoutBtn/>
              </div>
              </>
              
            ):
            (
              <div className='flex gap-4'>
               <Button asChild variant="outline" className="cursor-pointer px-6 py-3 text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl">
              <Link to="/register">Sign Up</Link>
            </Button>

            <Button asChild variant="outline" className="cursor-pointer px-6 py-3 text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl">
              <Link to="/login">Sign In</Link>
            </Button>
              </div>
            )
           }
         </nav>
    </header>
    
  )
}

export default Header
