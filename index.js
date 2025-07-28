// Import required modules
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Default route
app.get('/', (req, res) => res.send('Hello World!'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the Express app for testing/external use
module.exports = app;