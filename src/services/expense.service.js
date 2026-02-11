const expenseRepository = require('../repositories/expense.repository.js');
const { v4: uuidv4 } = require('uuid');

async function createExpense(userId, expenseData) {
  const categoryName = expenseData.category;
  const category = await expenseRepository.getCategoryByName(categoryName);

  if (!category) {
    throw new Error('Invalid category');
  }


  const expensePayload = {
    id: uuidv4(),
    userId,
    title: expenseData.title,         
    description: expenseData.description,
    categoryId: category.id,
    paymentMethod: expenseData.paymentMethod,
    amount: expenseData.amount,
    transactionDate: expenseData.transactionDate,
  };

  const expense = await expenseRepository.createExpense(expensePayload);

  return {
    ...expense,
    category: category.name,
  };
}

async function getAllExpenses(){
  return await expenseRepository.getAllExpenses();
}
module.exports = { createExpense,getAllExpenses};
