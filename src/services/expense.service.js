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

const getAllExpenses=async(userId, queryParams)=>{
  return await expenseRepository.getAllExpenses(userId, queryParams);
}

async function updateExpense(userId, expenseId, updateData) {
  const existingExpense = await expenseRepository.getExpenseById(expenseId);
  if (!existingExpense) {
    throw new Error('Expense not found');
  }
  const getUserId=await expenseRepository.getUserId(expenseId);
  if(userId!=getUserId){
    throw new Error(`Expense not found for user id ${userId}`);
  }

  if (updateData.category) {
    const category = await expenseRepository.getCategoryByName(updateData.category);
    if (!category) {
      throw new Error('Invalid category');
    }
    updateData.categoryId = category.id;
  }
  const updatedExpense = await expenseRepository.updateExpense(userId,expenseId,updateData);
  return {...updatedExpense,category: updateData.category};
}
module.exports = { createExpense,getAllExpenses,updateExpense};