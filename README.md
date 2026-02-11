## Expense Tracker

A RESTful API for a Personal Expense Tracker that allows users to record, manage, and analyze their expenses. The system enables tracking of spending through categorized expenses stored in a database and supports filtering and reporting features.

### Features to Implement

- Record a new expense with details such as title, amount, category, payment method, and transaction date.
- Retrieve all expenses with support for filtering by category, payment method, date range, and amount range.
- View details of a specific expense by ID.
- Update an existing expense with partial modifications.
- Delete an expense from the system.
- Calculate total spending within a specified date range.

## Tech Stack

- Node.js – Runtime environment
- Express.js – Backend framework for building REST API
- PostgreSQL – Database for data storage
- Drizzle ORM – Type-safe database ORM
- Zod – Schema validation and request validation

## Project Structure
```code
personal-expense-tracker/
│
├── src/
|   ├── app.js                      
|   ├── server.js                   
|   ├── db/
│   │   ├── index.js                
│   │   └── seed.js                 
|   ├── models/
|   │   └── schema/                 
|   │       ├── categories.schema.js
│   │       ├── users.schema.js
|   │       └── expenses.schema.js
|   ├── controllers/                
|   ├── services/                   
│   ├── repositories/               
│   └── routes/                     
|                     
├── drizzle.config.js              
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```
## Feature Implemented
### Create Expense
Allows user to create expense.
- Endpoint : POST /v1/expense

**Request Body:**
```json
{
  "title": "title",
  "description": "description",
  "category": "food",
  "paymentMethod": "cash",
  "amount": "150.50",
  "transactionDate": "2026-02-10"
}
```
**Expected Response**
```json
{
  "id": "uuid",
  "userId": 1,
  "title": "title",
  "description": "description",
  "categoryId": 2,
  "paymentMethod": "cash",
  "amount": "150.50",
  "transactionDate": "2026-02-10",
  "createdAt": "<timestamps>",
  "category": "food"
}
```
### Get All Expenses
Retrieve all expenses with optional filters.
- GET http://localhost:3000/v1/expense
- GET http://localhost:3000/v1/expense?category=food
- GET http://localhost:3000/v1/expense?startDate=2024-02-01&endDate=2024-02-28
- GET http://localhost:3000/v1/expense?minAmount=100&maxAmount=500

**Query Parameters:**
- `category` - Filter by expense category 
- `paymentMethod` - Filter by payment method
- `startDate` - Filter expenses from this date onwards (YYYY-MM-DD)
- `endDate` - Filter expenses up to this date (YYYY-MM-DD)
- `minAmount` - Filter expenses with amount greater than or equal to this value
- `maxAmount` - Filter expenses with amount less than or equal to this value

## How to Run the Project
### Prerequisites
Make sure you have these installed before starting:
- Node.js 
- PostgreSQL
- pgAdmin

### 1. Clone the Repository

```bash
git clone https://github.com/Priyansh7999/personal-expense-tracker.git
cd personal-expense-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 4. Database Setup

#### Step 1: Install PostgreSQL
Download and install PostgreSQL from (https://www.postgresql.org/download/)

#### Step 2: Create Database using pgAdmin
1. Open pgAdmin
2. Connect to your PostgreSQL server
2. Create database name: expense_tracker

#### Step 3: Configure Environment Variables
Create a `.env` file in the root directory
```env
SERVER_PORT=3000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/expense_tracker
```
#### Step 4: Run Migrations
```bash
# Push schema to database
npx drizzle-kit push
```

#### Step 5: Seed the Database
```bash
node src/db/seed.js
```
This will automatically insert:
- Categories: `emi`, `food`, `transport`, `healthcare`, `rent`, `other`
- Default user: `Priyansh`

### 7. Start the Server

```bash
npm start
```

The API will run on `http://localhost:3000`