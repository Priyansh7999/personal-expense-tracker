
const expenseService = require('../services/expense.service');
async function createExpense(req, res) {
  try {
    const userId = 1;
    const expense = await expenseService.createExpense(userId, req.body);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message
      }
    });
  }
}
async function getAllExpenses(req, res){
  try {
    const userId = 1;
    const expenses = await expenseService.getAllExpenses(userId,req.query);
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message,
      },
    });
  }
}
module.exports = {createExpense,getAllExpenses}