const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateResume } = require('./controllers/resumeController');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Resume Generator API is working!' });
});

// Resume generation endpoint
app.post('/api/generate-resume', generateResume);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 