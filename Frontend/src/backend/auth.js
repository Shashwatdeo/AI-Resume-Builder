import axios from 'axios';
import {toast,Toaster} from 'sonner'

const API_URL = import.meta.env.VITE_API_URL;

export class AuthService{

    async register({name,email, password}) {
        try {
            const response = await axios.post(`${API_URL}/api/users/register`,
            { name,email, password },
            { withCredentials: true } 
            );

    //   console.log(response);
      return response
      
        } catch (error) {
            console.log("register :: error", error);
            
            // Let the component handle the error display
            // Don't show toast here to avoid duplicate error messages
            throw error; // Re-throw to let the component handle it
        }
    }

    async getCurrentUser() {
        try {
            // Try with cookies first
            let response = await axios.get(`${API_URL}/api/users/currentUser`, {
                withCredentials: true, 
            });
            return response.data;
        } catch (error) {
            // If cookies fail, try with Authorization header
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/api/users/currentUser`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    return response.data;
                } catch (headerError) {
                    console.log("getCurrentUser with token :: error", headerError);
                    
                    // If token is expired (401), try to refresh
                    if (headerError.response?.status === 401) {
                        try {
                            const refreshResponse = await axios.post(`${API_URL}/api/users/refresh-token`, {}, {
                                withCredentials: true
                            });
                            
                            if (refreshResponse.data.accessToken) {
                                localStorage.setItem('accessToken', refreshResponse.data.accessToken);
                                
                                // Retry getCurrentUser with new token
                                const retryResponse = await axios.get(`${API_URL}/api/users/currentUser`, {
                                    headers: {
                                        'Authorization': `Bearer ${refreshResponse.data.accessToken}`
                                    },
                                    withCredentials: true
                                });
                                return retryResponse.data;
                            }
                        } catch (refreshError) {
                            console.log("Token refresh failed:", refreshError);
                            localStorage.removeItem('accessToken');
                        }
                    } else {
                        localStorage.removeItem('accessToken');
                    }
                }
            }
            console.log("getCurrentUser :: error", error);
        }

        return null;
    }

    async login({email, password}) {
        try {
            const response = await axios.post(`${API_URL}/api/users/login`,
            { email, password },
            { withCredentials: true } 
            );

            // Store tokens in localStorage as fallback for cross-domain issues
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }

            return response
      
        } catch (error) {
            console.log("login :: error", error);
            throw error; // Re-throw to let the component handle it
        }
    }

    async logout() {
        try {
            await axios.post(`${API_URL}/api/users/logout`, {}, {
            withCredentials: true,
            });
            // Clear localStorage token on logout
            localStorage.removeItem('accessToken');
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.log("logout :: error", error);
            // Clear localStorage token even if logout fails
            localStorage.removeItem('accessToken');
        }
    }
}

const authService = new AuthService();
export default authService;