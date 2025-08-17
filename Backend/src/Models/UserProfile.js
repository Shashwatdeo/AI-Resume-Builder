import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technologies: [String],
});

const UserProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add user reference (not required for existing profiles)
  name: String,
  email: String,
  skills: [String],
  projects: [ProjectSchema],
  jobProfile: String,
  salary: Number,
  difficulty: String,
  resumeText: String, // Optional: store raw text if needed
  createdAt: { type: Date, default: Date.now }
});

export const UserProfile = mongoose.model('UserProfile', UserProfileSchema);