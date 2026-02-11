// src/db/seed.js
const db = require('./index');
const { categories } = require('../models/schema/categories.schema');
const { users } = require('../models/schema/users.schema');
const { eq } = require('drizzle-orm');

async function seed() {
  const categoryList = ['emi', 'food', 'transport', 'healthcare', 'rent', 'other'];
  for (const name of categoryList) {
    const exists = await db.select().from(categories).where(eq(categories.name, name));
    if (exists.length === 0) {
      await db.insert(categories).values({ name });
    } else {
      console.log(`Category already exists: ${name}`);
    }
  }
  const existingUser = await db.select().from(users);
  if (existingUser.length === 0) {
    await db.insert(users).values({ name: 'Priyansh' });
  } else {
    console.log('User already exists');
  }
  console.log('Seeding done');
  process.exit(0);
}

seed();