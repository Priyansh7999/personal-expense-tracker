const db = require('../db/index');
const { expenses } = require('../models/schema/expenses.schema');
const { categories } = require('../models/schema/categories.schema');
const { eq, gte, lte } = require('drizzle-orm');

class ExpenseRepository {
  async getCategoryByName(name){
    const result = await db.select().from(categories).where(eq(categories.name, name));
    return result[0] || null;
  }
  async createExpense(expenseData){
    const [inserted] = await db.insert(expenses).values(expenseData).returning();
    return inserted;
  }

  async getAllExpenses(userId, queryParams){
    let result = db.select().from(expenses).where(eq(expenses.userId,userId));
    if (queryParams.category) {
      const categoryName = queryParams.category.toLowerCase().trim();
      const category = await this.getCategoryByName(categoryName);
      result = result.where(eq(expenses.categoryId, category.id));
    }
    if(queryParams.paymentMethod){
      const method = queryParams.paymentMethod.toLowerCase().trim();
      result = result.where(eq(expenses.paymentMethod, method));
    }
    if(queryParams.startDate) result = result.where(gte(expenses.transactionDate, queryParams.startDate));
    if (queryParams.endDate) result = result.where(lte(expenses.transactionDate, queryParams.endDate));

    if (queryParams.minAmount)result =result.where(gte(expenses.amount, queryParams.minAmount));
    if (queryParams.maxAmount) result = result.where(lte(expenses.amount, queryParams.maxAmount));
    
    return await result;
  }
}
module.exports=new ExpenseRepository();
