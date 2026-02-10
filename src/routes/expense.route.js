const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense.controller.js');
const { CreateExpenseMiddleware } = require('../middlewares/expense.middleware.js');

router.post('/', CreateExpenseMiddleware, expenseController.createExpense);
router.get('/',expenseController.getAllExpenses)
router.get('/:id', expenseController.getExpenseDetails); 
module.exports = router;