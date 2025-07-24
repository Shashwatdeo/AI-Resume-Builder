import axios from 'axios'
import { toast } from 'sonner';

export class ResumeService {
  async saveResumeData({ resumeId,resumeData }) {
    try {
      console.log('Saving resume data:', { resumeId, resumeData })
      
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API_URL}/api/resume/save`,
        {resumeId,resumeData,},
        {
          withCredentials: true
        }
      );

      return response
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Something went wrong while saving the resume.');
    }
  }
  
  async getResumeData(resumeId) {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(
        `${API_URL}/api/resume/${resumeId}`,
        {
          withCredentials: true
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Something went wrong while fetching the resume.');
    }
  }

  async createResume(name,templateName) {
    try {

      
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API_URL}/api/resume/create`,
        { name, templateName },
        {
          withCredentials: true
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Something went wrong while creating the resume.');
    }
  }

  async getAllResumes(){
     try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/api/resume/`, {
          withCredentials: true
        });
        return response.data.data;
      } catch (error) {
        toast.error('Something went wrong while fetching resumes.');
        console.error('Error fetching resumes:', error);
      }
  }

  async deleteResume(resumeId) {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.delete(
        `${API_URL}/api/resume/${resumeId}`,
        {
          withCredentials: true
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Something went wrong while deleting the resume.');
    }
  }

  async checkAtsScore(data){
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/api/resume/ats/check`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      toast.error('Something went wrong while checking ATS score.');
      console.error('Error checking ATS score:', error);
    }
  }
}




const resumeService  = new ResumeService();
export default resumeService