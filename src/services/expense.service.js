const { getCategoryByName, createExpense: createExpenseRepo } = require('../repositories/expense.repository.js');
const { v4: uuidv4 } = require('uuid');

async function createExpense(userId, expenseData) {
  const categoryName = expenseData.category;
  const category = await getCategoryByName(categoryName);

  if (!category) {
    throw new Error(`Category '${categoryName}' not found`);
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

  const expense = await createExpenseRepo(expensePayload);

  return {
    ...expense,
    category: category.name,
  };
}

module.exports = { createExpense };
