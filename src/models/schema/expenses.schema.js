const { pgTable, uuid, integer, numeric, varchar, timestamp, date } = require('drizzle-orm/pg-core'); 
const { categories } = require('./categories.schema');
const { users } = require('./users.schema');

const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 1000 }),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  transactionDate: date('transaction_date').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

module.exports = { expenses };