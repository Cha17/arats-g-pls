import { Hono } from 'hono';
import { cors } from 'hono/cors';
import authRoutes from './routes/auth';
// import webhookRoutes from './routes/webhooks';

const app = new Hono();

// CORS middleware
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.route('/api/auth', authRoutes);
// app.route('/api/webhooks', webhookRoutes);

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export for Vercel serverless functions
export default app;