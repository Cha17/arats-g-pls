import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// CORS middleware - Allow multiple origins
app.use('*', cors({
  origin: [
    'https://arats-client.vercel.app',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['Content-Length', 'X-Requested-With'],
}));

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (c) => {
  return c.json({ 
    message: 'ARATS API Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Events endpoints
app.get('/events', (c) => {
  return c.json({ 
    success: true,
    events: [],
    message: 'Events endpoint - implement your events logic here',
    timestamp: new Date().toISOString()
  });
});

app.get('/events/featured', (c) => {
  return c.json({ 
    success: true,
    events: [],
    message: 'Featured events endpoint - implement your featured events logic here',
    timestamp: new Date().toISOString()
  });
});

// Basic auth endpoint (placeholder - you can add your auth routes here)
app.get('/auth/me', (c) => {
  return c.json({ 
    message: 'Auth endpoint - implement your authentication logic here',
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel
export default app; 