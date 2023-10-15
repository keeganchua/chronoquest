const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

// Read the new private key
const privateKey = fs.readFileSync('key.pem', 'utf8');

// Read the SSL certificate
const certificate = fs.readFileSync('cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Your Express app configuration and routes go here

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

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
httpsServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = httpsServer; // Export the server for testing
