// src/models/schema/categories.schema.js
const { pgTable, serial, varchar } = require('drizzle-orm/pg-core');

const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

module.exports = { categories };