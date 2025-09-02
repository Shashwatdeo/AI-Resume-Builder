# Security Implementation Guide

## Overview
This document outlines the security measures implemented in the AI Resume Builder backend.

## ✅ Implemented Security Measures

### 1. Password Security
- **Bcrypt hashing** with 10 salt rounds
- **Password requirements**: Minimum 6 characters, uppercase, lowercase, and number
- **Secure storage**: Passwords never stored in plain text

### 2. JWT Authentication
- **Access tokens**: 15-minute expiry (short-lived)
- **Refresh tokens**: 7-day expiry (long-lived)
- **Secure storage**: HttpOnly, Secure cookies with SameSite=None
- **Token rotation**: Refresh tokens invalidated on logout

### 3. Input Validation & Sanitization
- **Express-validator**: Comprehensive input validation
- **XSS protection**: HTML tag removal and character sanitization
- **Email normalization**: Lowercase and trim validation
- **Input length limits**: Name (2-50 chars), password (min 6 chars)

### 4. Security Headers (Helmet.js)
- **Content Security Policy**: Restricts resource loading
- **X-Frame-Options**: Prevents clickjacking (DENY)
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: XSS protection for older browsers
- **HSTS**: HTTPS enforcement (1 year max-age)

### 5. Rate Limiting
- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 login attempts per 15 minutes per IP
- **API endpoints**: 200 requests per 15 minutes per IP

### 6. CORS Configuration
- **Origin restrictions**: Only allowed domains can access
- **Credentials**: Supports authenticated requests
- **Preflight caching**: 24-hour OPTIONS response caching

### 7. HTTPS Enforcement
- **Production redirects**: HTTP → HTTPS automatic redirect
- **HSTS headers**: Strict Transport Security enforcement
- **Secure cookies**: Only sent over HTTPS in production

### 8. Role-Based Access Control
- **Middleware system**: `requireRole()`, `requireAdmin()`, `requireUser()`
- **Extensible**: Easy to add new roles and permissions
- **Default role**: All users get 'user' role by default

## 🔧 Configuration

### Environment Variables
```bash
# Required
ACCESS_TOKEN_SECRET=your-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret
MONGODB_URI=your-mongodb-connection
GEMINI_API_KEY=your-gemini-api-key

# Optional
NODE_ENV=production
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
GEMINI_TIMEOUT_MS=12000
```

### Security Settings
All security configurations are centralized in `src/config/security.js`:
- Rate limiting thresholds
- Password requirements
- CORS origins
- Security header values

## 🚀 Production Deployment

### Required Steps
1. Set `NODE_ENV=production`
2. Use HTTPS (Render/Vercel provide this)
3. Set strong JWT secrets
4. Configure allowed CORS origins
5. Enable MongoDB connection encryption

### Security Checklist
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] CORS origins configured
- [ ] Rate limiting active
- [ ] Security headers present
- [ ] Input validation working
- [ ] Password requirements enforced

## 🔍 Monitoring & Testing

### Security Headers Check
```bash
curl -I https://your-domain.com/health
# Should show: X-Frame-Options, HSTS, X-Content-Type-Options, etc.
```

### Rate Limiting Test
```bash
# Test login rate limiting
for i in {1..10}; do curl -X POST https://your-domain.com/api/users/login; done
# Should get rate limited after 5 attempts
```

### Input Validation Test
```bash
# Test XSS protection
curl -X POST https://your-domain.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(1)</script>","email":"test@test.com","password":"Test123"}'
# Should reject or sanitize the name
```

## 🛡️ Additional Recommendations

### Future Enhancements
1. **2FA/MFA**: Add two-factor authentication
2. **Audit logging**: Track security events
3. **IP whitelisting**: Restrict access to known IPs
4. **Session management**: Track active sessions
5. **Security scanning**: Regular dependency audits

### Monitoring
- Monitor failed login attempts
- Track rate limit violations
- Log security-related errors
- Regular security audits

## 📚 Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practices-security.html)
- [JWT Security](https://jwt.io/introduction)
- [Helmet.js Documentation](https://helmetjs.github.io/)
