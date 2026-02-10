const db = require('../db/index');
const { expenses } = require('../models/schema/expenses.schema');
const { categories } = require('../models/schema/categories.schema');
const { eq } = require('drizzle-orm');
class ExpenseRepository {
  async getCategoryByName(name){
    const result = await db.select().from(categories).where(eq(categories.name, name));
    return result[0] || null;
  }
}
module.exports=new ExpenseRepository();
