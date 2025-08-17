import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import  store  from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Login from './components/loginComponent/Login.jsx'
import Register from './components/registerComponent/Register.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import Resume from './components/ResumeForm/Resume.jsx'
import LandingPage from './components/LandingPage.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Protected from './components/AuthLayout.jsx'
import ResumeTemplates from './components/ResumeForm/Template/ResumeTemplates.jsx'
import ATSChecker from './components/ATSChecker/ATSChecker.jsx'
import AiInterview from './components/AiInterview/AiInterview.jsx'
import ProfileView from './components/AiInterview/ProfileView.jsx'
import InterviewPractice from './components/AiInterview/InterviewPractice.jsx'
import SmartSuggestions from './components/SmartSuggestions.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '/',
        element:<Protected authentication={false}><LandingPage/></Protected> 
      },
      {
        path:"/resume/:id",
        element:<Protected authentication={true}><Resume/></Protected> 
      },
      {
        path: '/dashboard',
        element:<Protected authentication={true}><Dashboard/></Protected> 
      },
      {
        path:'/templates',
        element:<Protected authentication={true}><ResumeTemplates/></Protected>
      },
      {
        path:'/ats',
        element:<Protected authentication={true}><ATSChecker/></Protected>
      },
      {
        path:'/ai-interview',
        element:<Protected authentication={true}><AiInterview/></Protected>
      },
      {
        path: '/profile/:id',
        element: <Protected authentication={true}><ProfileView/></Protected>
      },
      {
        path:'/interview-practice/:id',
        element:<Protected authentication={true}><InterviewPractice/></Protected>
      },
      {
        path:'/smart-suggestions',
        element:<SmartSuggestions/>
      },
      {
        path: '/login',
        element: <Protected authentication={false}><Login/></Protected>
      },
      {
        path: '/register',
        element:<Protected authentication={false}><Register/></Protected>
      },
      {
        path: '/forgot-password',
        element:<Protected authentication={false}><ForgotPassword/></Protected>
      },
      {
        path: '/reset-password/:token',
        element:<Protected authentication={false}><ResetPassword/></Protected>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router}/>
     </Provider>
  </StrictMode>,
)
