// server/routes/auth.ts
import { Hono } from 'hono';
import { authMiddleware, requireAdmin } from '../middleware/auth';
import { UserService } from '../services/userService';

const authRoutes = new Hono();

// Get current user info (protected route)
authRoutes.get('/me', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ user });
});

// Check user role and redirect info
authRoutes.get('/role-redirect', authMiddleware, async (c) => {
  const user = c.get('user');
  
  const redirectPath = user.role === 'admin-arats' 
    ? '/admin/dashboard' 
    : '/user/dashboard';
    
  return c.json({ 
    role: user.role, 
    redirectPath,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  });
});

// User routes
authRoutes.get('/user/profile', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ message: 'User profile', user });
});

// Admin routes
authRoutes.get('/admin/users', authMiddleware, requireAdmin, async (c) => {
  const users = await UserService.getAllUsers();
  return c.json({ users });
});

authRoutes.patch('/admin/users/:kindeId/role', authMiddleware, requireAdmin, async (c) => {
  const kindeId = c.req.param('kindeId');
  const { role } = await c.req.json();
  
  if (!['arats-user', 'admin-arats'].includes(role)) {
    return c.json({ error: 'Invalid role' }, 400);
  }
  
  const updatedUser = await UserService.updateUserRole(kindeId, role);
  if (!updatedUser) {
    return c.json({ error: 'User not found' }, 404);
  }
  
  return c.json({ message: 'Role updated', user: updatedUser });
});

export default authRoutes;