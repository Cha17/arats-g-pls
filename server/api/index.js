export default function handler(req, res) {
  res.json({ 
    message: 'ARATS API Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
} 