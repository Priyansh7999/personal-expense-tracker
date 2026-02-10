// src/app.js
const express = require('express')
const app = express();
const expenseRoute = require('./routes/expense.route');
/** Express application
*
* config Middleware & routes
**/

app.use(express.json());

/**
 * Health check route.
 * Used to verify server status.
 *
 * @route GET /health
 * @returns {Object} 200 - Server health status
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Server is up and healthy',
    });
});

app.use('/v1/expense',expenseRoute)
module.exports = app;