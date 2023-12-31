const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = process.env.PORT || 3000; 

// Your Express app configuration and routes go here

// Middleware to parse JSON requests
app.use(express.json());

// Use the cors middleware to enable CORS for all routes
app.use(cors()); // This allows all origins by default, you can configure it further if needed.

// Dummy data for watches (replace with your actual data source)
const watches = [
    { id: 1, name: 'Rolex Submariner' },
    { id: 2, name: 'Omega Seamaster' },
    { id: 3, name: 'Tag Heuer Carrera' },
    // Add more watch data here
];

// Define a route to handle search requests
app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    console.log('Received search query:', query); // Add this line
    const results = watches.filter((watch) =>
        watch.name.toLowerCase().includes(query)
    );
    console.log('Search results:', results); // Add this line
    res.json(results);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the server for testing
