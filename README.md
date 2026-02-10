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
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
│
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```
## How to Run the Project

1. Clone the Repository
```code
git clone https://github.com/Priyansh7999/personal-expense-tracker.git
cd personal-expense-tracker
```
2. Install Dependencies
```code
npm install
```
3. Setup Environment Variables
 - Create a .env file in the root directory and add
 ```env
SERVER_PORT=3000
 ```
4. Start the Server
```code
node src/server.js
```
 The API will run on:
```code
http://localhost:3000
```