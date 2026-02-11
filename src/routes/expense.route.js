// src/routes/expense.route.js
const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense.controller.js');
const { createExpenseMiddleware } = require('../middlewares/expense.middleware.js');

router.post('/', createExpenseMiddleware, expenseController.createExpense);
router.get('/',expenseController.getAllExpenses)

module.exports = router;