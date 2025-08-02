import { Hono } from 'hono';
import { cors } from 'hono/cors';
import authRoutes from './routes/auth';
import eventsRoutes from './routes/events';
// import webhookRoutes from './routes/webhooks';

const app = new Hono();

// CORS middleware - more permissive for development
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.route('/api/auth', authRoutes);
app.route('/api/events', eventsRoutes);
// app.route('/api/webhooks', webhookRoutes);

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default app;