const db = require('../db/index');
const { expenses } = require('../models/schema/expenses.schema');
const { categories } = require('../models/schema/categories.schema');
const { eq } = require('drizzle-orm');
class ExpenseRepository {
  async getCategoryByName(name){
    const result = await db.select().from(categories).where(eq(categories.name, name));
    return result[0] || null;
  }
  async createExpense(expenseData){
    const [inserted] = await db.insert(expenses).values(expenseData).returning();
    return inserted;
  }

  async getAllExpenses(){
    return await db.select().from(expenses);
  }
}
module.exports=new ExpenseRepository();
