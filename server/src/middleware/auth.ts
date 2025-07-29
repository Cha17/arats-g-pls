// server/middleware/auth.ts
import { Context, Next } from 'hono';
import { KindeService } from '../services/kindeService';
import { UserService } from '../services/userService';
import type { User, UserRole } from '../db/schema';

// Extend Hono's context to include user
declare module 'hono' {
  interface ContextVariableMap {
    user: User;
  }
}

// Authentication middleware
export const authMiddleware = async (c: Context, next: Next) => {
  try {
    // Extract token from request
    const authHeader = c.req.header('Authorization');
    const cookies = c.req.header('Cookie');
    console.log('Auth Debug:');
    console.log('Auth Header:', authHeader);
    console.log('Cookies:', cookies);
    
    const token = KindeService.extractToken(authHeader, cookies);
    console.log('Extracted token:', token ? 'Present' : 'Not found');
    
    if (!token) {
      return c.json({ error: 'No authentication token provided' }, 401);
    }

    // Verify JWT token with Kinde
    const decodedToken = await KindeService.verifyToken(token);
    console.log('Decoded token:', decodedToken ? 'Valid' : 'Invalid');
    
    if (!decodedToken) {
      return c.json({ error: 'Invalid or expired token' }, 401);
    }

    // Create or update user in database with roles from token
    const user = await UserService.createOrUpdateUser({
      id: decodedToken.sub,
      email: decodedToken.email,
      given_name: decodedToken.given_name,
      family_name: decodedToken.family_name,
    }, decodedToken);

    // Set user in context
    c.set('user', user);
    
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Authentication failed' }, 500);
  }
};

// Role-based middleware factory
export const requireRole = (allowedRoles: UserRole[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get('user');
    
    if (!user) {
      return c.json({ error: 'User not authenticated' }, 401);
    }

    if (!allowedRoles.includes(user.role)) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    await next();
  };
};

// Convenience middlewares
export const requireAdmin = requireRole(['admin-arats']);
export const requireUser = requireRole(['arats-user', 'admin-arats']); // Admin can access user routes too