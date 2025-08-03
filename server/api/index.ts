import { Hono } from 'hono';
import { cors } from 'hono/cors';
import authRoutes from '../src/routes/auth';

const app = new Hono();

// CORS middleware
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.route('/auth', authRoutes);

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint for Vercel
app.get('/', (c) => {
  return c.json({ 
    message: 'ARATS API Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel serverless functions
export default app; 