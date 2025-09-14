import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const location = useLocation()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // For routes that don't require authentication (like login, register, forgot-password)
        if (!authentication) {
            // If user is already logged in and trying to access auth pages or landing page, redirect to dashboard
            if (authStatus && (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/')) {
                navigate("/dashboard")
            } else {
                // Allow access to auth pages for non-authenticated users
                setLoader(false)
            }
        } else {
            // For protected routes that require authentication
            if (!authStatus) {
                navigate("/login")
            } else {
                setLoader(false)
            }
        }
    }, [authStatus, navigate, authentication, location.pathname])

    return loader ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
            </div>
        </div>
    ) : <>{children}</>
}

