# AI Resume Builder

A modern web application that helps users create professional resumes with AI assistance. Built with React, Node.js, and MongoDB.

## 🚀 Features

<!-- - **AI-Powered Resume Creation**: Get intelligent suggestions and content recommendations -->
- **Drag-and-Drop Interface**: Easy-to-use interface for organizing resume sections
<!-- - **Multiple Resume Templates**: Choose from various professional templates -->
- **Real-time Preview**: See changes as you make them
- **Export Options**: Download your resume in multiple formats
- **User Authentication**: Secure login and registration system
<!-- - **Cloud Storage**: Save and manage multiple resumes
- **Responsive Design**: Works seamlessly on desktop and mobile devices -->

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- Vite as build tool
- React Router for navigation
- DND Kit for drag-and-drop functionality

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Cloudinary for image storage
- Puppeteer for PDF generation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Frontend directory:
   ```
   VITE_GEMINI_API_KEY=your gemini api key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
