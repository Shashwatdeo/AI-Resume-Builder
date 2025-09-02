import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connnectDB from "./db/index.js";
import userRouter from "./Routes/user.route.js"
import resumeRouter from "./Routes/resume.route.js"
import interviewRouter from "./Routes/interview.route.js"
import { SECURITY_CONFIG, getSecuritySettings } from "./config/security.js";
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env' })

const app = express();
const securitySettings = getSecuritySettings();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://generativelanguage.googleapis.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: securitySettings.HEADERS.HSTS_MAX_AGE,
    includeSubDomains: true,
    preload: true
  },
  xFrameOptions: { action: 'deny' },
  xContentTypeOptions: true,
  xXssProtection: true
}));

// Rate limiting
const limiter = rateLimit(securitySettings.RATE_LIMIT.GENERAL);
const authLimiter = rateLimit(securitySettings.RATE_LIMIT.AUTH);
const apiLimiter = rateLimit(securitySettings.RATE_LIMIT.API);

app.use(limiter);
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', apiLimiter);

const allowedOrigins = securitySettings.CORS.ALLOWED_ORIGINS;

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// HTTPS enforcement in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
  
  // HSTS headers
  app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });
}

// Simple request timing middleware and fast OPTIONS handling
app.use((req, res, next) => {
  const startHrTime = process.hrtime.bigint();
  res.setHeader('X-Request-Start', Date.now().toString());

  // Handle CORS preflight quickly and cache it
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Max-Age', '86400'); // 24h
    return res.sendStatus(204);
  }

  res.on('finish', () => {
    const endHrTime = process.hrtime.bigint();
    const durationMs = Number(endHrTime - startHrTime) / 1_000_000;
    // Do not set headers after they are sent; just log
    try {
      console.log(`${req.method} ${req.originalUrl} - ${durationMs.toFixed(1)}ms`);
    } catch {}
  });
  next();
});

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


