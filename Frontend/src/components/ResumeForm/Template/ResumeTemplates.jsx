import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GeneralPreview from './GeneralPreview.jsx';
import SpecializedPreview from './SpecializedPreview';
import resumeService from '../../../backend/resume.js';
import { Button } from "../../ui/button.jsx";
import { Check, Star, Eye, Download, Zap, Award, TrendingUp } from 'lucide-react';
import generalTemplateImg from '../../../assets/general-template.jpg';
import specializedTemplateImg from '../../../assets/specialized-template.jpg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

function ResumeTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const templates = [
    {
      id: 'general',
      name: 'General Resume',
      description: 'Professional format suitable for most industries',
      longDescription: 'Perfect for entry-level positions and career changers. Clean, traditional layout that works well with ATS systems.',
      thumbnail: generalTemplateImg,
      previewComponent: GeneralPreview,
      previewImage: generalTemplateImg,
      features: ['ATS Optimized', 'Professional Design', 'Easy to Customize', 'Industry Standard'],
      rating: 4.8,
      usage: '85% of users',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      icon: '📄'
    },
    {
      id: 'specialized',
      name: 'Specialized Resume',
      description: 'Tailored for specific roles with a modern design',
      longDescription: 'Modern design with enhanced visual appeal. Great for experienced professionals and creative roles.',
      thumbnail: specializedTemplateImg,
      previewComponent: SpecializedPreview,
      previewImage: specializedTemplateImg,
      features: ['Modern Design', 'Visual Impact', 'Creative Layout', 'Stand Out'],
      rating: 4.9,
      usage: '65% of users',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🎨'
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleContinueClick = () => {
    setIsDialogOpen(true);
  };

  const handleCreateResume = async () => {
    if (!resumeName.trim()) {
      alert('Please enter a resume name');
      return;
    }

    try {
      let templateName = 'GeneralPreview';
      if (selectedTemplate.name === 'Specialized Resume') {
        templateName = 'SpecializedPreview';
      }
      const response = await resumeService.createResume(
        resumeName,
        templateName
      );
      navigate(`/resume/${response._id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl">
              📄
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a professional template that matches your career goals and industry standards
          </p>
        </div>

        {/* Template Comparison */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Template Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {templates.map((template, index) => (
                <div key={template.id} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${template.color} rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4`}>
                    {template.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(template.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{template.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{template.usage} choose this template</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Template Cards */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {templates.map((template, index) => (
            <div 
              key={template.id}
              className={`relative group cursor-pointer transition-all duration-500 ${
                selectedTemplate?.id === template.id 
                  ? 'ring-4 ring-blue-500 shadow-2xl' 
                  : 'hover:ring-2 hover:ring-blue-300 shadow-lg hover:shadow-xl'
              } bg-white rounded-2xl overflow-hidden transform hover:-translate-y-2`}
              onClick={() => handleTemplateSelect(template)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Template Image */}
              <div className="relative overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Selection Indicator */}
                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{template.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{template.longDescription}</p>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {template.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${template.color} rounded-full`}></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Usage Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{template.usage} choose this</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Popular</span>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              {hoveredTemplate === template.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white">
                    <Eye className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Preview Template</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Template Preview */}
        {selectedTemplate && (
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTemplate.name} Preview</h2>
                    <p className="text-gray-600">See how your resume will look with this template</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{selectedTemplate.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">• {selectedTemplate.usage}</span>
                  </div>
                </div>
                
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={selectedTemplate.previewImage} 
                    alt={`${selectedTemplate.name} Preview`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${selectedTemplate.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                      {selectedTemplate.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedTemplate.name}</h3>
                      <p className="text-sm text-gray-600">Ready to create your professional resume</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleContinueClick}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 cursor-pointer"
                  >
                    <Zap className="h-4 w-4" />
                    Use {selectedTemplate.name}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Resume Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px] border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Name Your Resume</DialogTitle>
              <DialogDescription className="text-base">
                Give your resume a professional name to easily identify it later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Resume Name
                </Label>
                <Input
                  id="name"
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  className="text-lg"
                  placeholder="e.g., Software Engineer Resume"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateResume()}
                />
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-medium">Pro Tip</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Use a descriptive name like "Software Engineer Resume" or "Marketing Manager 2024"
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleCreateResume}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
              >
                Create Resume
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ResumeTemplates;