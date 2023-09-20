const config = {
    development: {
        apiUrl: 'http://localhost:3000', // Change this to your development API URL
    },
    production: {
        apiUrl: 'https://your-production-api-url.com', // Change this to your production API URL
    },
};

// Determine the environment based on NODE_ENV
const environment = process.env.NODE_ENV || 'development';

export default config[environment];
