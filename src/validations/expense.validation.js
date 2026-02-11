// src/validations/expense.validation.js
const { z } = require('zod');

const PAYMENT_METHODS = ['cash', 'credit card', 'debit card', 'upi'];


const titleValidation = z.string().trim().min(1, 'Title must be at least 1 characters').max(100, 'Title cannot exceed 100 characters');
const descriptionValidation = z.string().trim().min(1, 'Description must be at least 1 characters').max(1000, 'Description cannot exceed 1000 characters');
const categoryValidation = z.string().trim().min(1, 'Category is required').max(50, 'Category cannot exceed 50 characters').transform((val) => val.toLowerCase());
const paymentMethodValidation = z.string().trim().transform((val) => val.toLowerCase()).refine((val) => PAYMENT_METHODS.includes(val), {
    message: 'Invalid payment method',
});
const amountValidation = z.number().positive('Amount must be greater than 0');


const transactionDateValidation = z.string().refine((dateStr) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }
    const now = new Date();
  const fyStartYear =
    now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  const fyStart = new Date(fyStartYear, 3, 1);  
  const fyEnd = new Date(fyStartYear + 1, 2, 31); 
  return date >= fyStart && date <= fyEnd;
}, {
  message: 'Transaction date must be a valid date within the current financial year'
});

const createExpenseSchema = z
  .object({
    title: titleValidation,
    description: descriptionValidation,
    category: categoryValidation,
    paymentMethod: paymentMethodValidation,
    amount: amountValidation,
    transactionDate: transactionDateValidation,
  })

module.exports = {createExpenseSchema};