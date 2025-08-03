export default function handler(req, res) {
  res.status(200).json({ 
    message: 'ARATS API Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
} 