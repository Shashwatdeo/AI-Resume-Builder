// Basic role-based access control middleware
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    // For now, all authenticated users have 'user' role
    // You can extend this by adding a 'role' field to your User model
    const userRole = req.user.role || 'user';
    
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({ 
        success: false, 
        message: 'Insufficient permissions' 
      });
    }
  };
};

// Admin-only routes
export const requireAdmin = requireRole(['admin']);

// User and admin routes
export const requireUser = requireRole(['user', 'admin']);

// Premium user routes (for future use)
export const requirePremium = requireRole(['premium', 'admin']);
