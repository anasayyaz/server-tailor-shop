const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.REACT_APP_API_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Connect MongoDB with better error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// API Routes
app.use('/api/suit-types', require('./routes/suitTypeRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
  
  // Handle React routing, return all requests to React app
  // This must come after API routes
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API endpoint not found' });
    }
    res.sendFile(path.join(buildPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        res.status(500).send('Error loading page');
      }
    });
  });
} else {
  // Development route
  app.get('/', (req, res) => {
    res.send('Tailor Shop ERP API is running...');
  });
}

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
