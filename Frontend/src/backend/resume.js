import axios from 'axios'
import { toast } from 'sonner';

// Create axios instance with timeout
const apiClient = axios.create({
  timeout: 15000, // 15 second timeout
  withCredentials: true
});

// Add request interceptor for loading states
apiClient.interceptors.request.use(
  (config) => {
    // You can add loading indicators here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
    } else if (error.response?.status === 503) {
      toast.error('Service temporarily unavailable. Please try again in a moment.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export class ResumeService {
  async saveResumeData({ resumeId,resumeData }) {
    try {
      console.log('Saving resume data:', { resumeId, resumeData })
      
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await apiClient.post(
        `${API_URL}/api/resume/save`,
        {resumeId,resumeData,}
      );

      return response
    } catch (error) {
      console.error('Error saving resume:', error);
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Something went wrong while saving the resume.');
      }
      throw error;
    }
  }
  
  async getResumeData(resumeId) {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await apiClient.get(
        `${API_URL}/api/resume/${resumeId}`
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Something went wrong while fetching the resume.');
      }
      throw error;
    }
  }

  async createResume(name,templateName) {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await apiClient.post(
        `${API_URL}/api/resume/create`,
        { name, templateName }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Something went wrong while creating the resume.');
      }
      throw error;
    }
  }

  async getAllResumes(){
     try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await apiClient.get(`${API_URL}/api/resume/`);
        return response.data.data;
      } catch (error) {
        if (!error.response) {
          toast.error('Network error. Please check your connection.');
        } else {
          toast.error('Something went wrong while fetching resumes.');
        }
        console.error('Error fetching resumes:', error);
        throw error;
      }
  }

  async deleteResume(resumeId) {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await apiClient.delete(
        `${API_URL}/api/resume/${resumeId}`
      );

      return response.data;
    } catch (error) {
      console.error('Error deleting resume:', error);
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Something went wrong while deleting the resume.');
      }
      throw error;
    }
  }

  async checkAtsScore(data){
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await apiClient.post(`${API_URL}/api/resume/ats/check`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 seconds for file processing
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Something went wrong while checking ATS score.');
      }
      console.error('Error checking ATS score:', error);
      throw error;
    }
  }

  // Health check method
  async checkServerHealth() {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await apiClient.get(`${API_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Server health check failed:', error);
      return null;
    }
  }
}

const resumeService  = new ResumeService();
export default resumeService