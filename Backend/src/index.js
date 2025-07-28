import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv"
import connnectDB from "./db/index.js";
import userRouter from "./Routes/user.route.js"
import resumeRouter from "./Routes/resume.route.js"
import interviewRouter from "./Routes/interview.route.js"
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env' })

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-resumex-builder.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: '5mb' })); // or even higher if needed
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser())
app.use(express.static("public"))

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/api/users", userRouter)
app.use("/api/resume", resumeRouter)
app.use("/api/interview", interviewRouter)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server immediately
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

// Connect to database in background
connnectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("❌ MongoDB connection failed:", error.message);
    // Don't exit the process, let the server continue running
    // The app can work with cached data or show appropriate messages
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});


