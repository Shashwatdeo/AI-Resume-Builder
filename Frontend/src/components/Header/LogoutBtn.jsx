import React from 'react';
import { useDispatch } from 'react-redux';
import { logout} from '../../store/authSlice';
import authService from '../../backend/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout(); 
      dispatch(logout());
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error); 
    }
  };

  return (
    <Button
      onClick={logoutHandler}
      className="cursor-pointer px-6 py-3 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 hover:shadow-lg transition-all duration-300 rounded-xl"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
      </svg>
      Logout
    </Button>
  );
}

export default LogoutBtn;
