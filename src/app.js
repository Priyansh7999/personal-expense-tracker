// src/app.js
const express = require('express')
const app = express();

/** Express application
*
* config Middleware & routes
**/

app.use(express.json());

// Health Check Route 
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Server is up and healthy',
    });
});

module.exports = app;