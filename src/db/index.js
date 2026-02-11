// src/db/index.js
require('dotenv').config();
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect',()=>{
    console.log("database connected")
})
const db = drizzle(pool);

module.exports = db;