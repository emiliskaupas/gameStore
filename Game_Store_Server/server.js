const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDatabase } = require('./config/init');
const gameRoutes = require('./routes/gameRoutes');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
const allowedOrigins = [
  'https://game-store-drab-delta.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Game Store API Documentation'
}));

// Routes
app.use('/api', gameRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Game Store API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database schema
    await initDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`\n========================================`);
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`API Docs: http://localhost:${PORT}/api-docs`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`========================================\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

startServer();

module.exports = app;
