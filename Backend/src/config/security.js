// Security configuration constants
export const SECURITY_CONFIG = {
  // JWT settings
  JWT: {
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    ALGORITHM: 'HS256'
  },
  
  // Password settings
  PASSWORD: {
    MIN_LENGTH: 6,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
    SALT_ROUNDS: 10
  },
  
  // Rate limiting
  RATE_LIMIT: {
    GENERAL: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // requests per window
    },
    AUTH: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5 // login attempts per window
    },
    API: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 200 // API calls per window
    }
  },
  
  // CORS settings
  CORS: {
    ALLOWED_ORIGINS: [
      "http://localhost:5173",
      "https://ai-resumex-builder.vercel.app"
    ],
    CREDENTIALS: true,
    MAX_AGE: 86400 // 24 hours
  },
  
  // Security headers
  HEADERS: {
    HSTS_MAX_AGE: 31536000, // 1 year
    X_FRAME_OPTIONS: 'DENY',
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    X_XSS_PROTECTION: '1; mode=block'
  }
};

// Environment-specific security settings
export const getSecuritySettings = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    ...SECURITY_CONFIG,
    HTTPS_ONLY: isProduction,
    DEBUG_MODE: !isProduction,
    LOG_LEVEL: isProduction ? 'error' : 'debug'
  };
};
