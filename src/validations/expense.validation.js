// src/validations/expense.validation.js
const { z } = require('zod');

const PAYMENT_METHODS = ['cash', 'credit card', 'debit card', 'upi'];
const CATEGORIES = ['emi', 'food', 'transport', 'healthcare', 'rent', 'other'];


const titleValidation = z.string().trim().min(1, 'Title must be at least 1 characters').max(100, 'Title cannot exceed 100 characters');
const descriptionValidation = z.string().trim().min(1, 'Description must be at least 1 characters').max(1000, 'Description cannot exceed 1000 characters');
const categoryValidation = z.string().trim().transform((val) => val.toLowerCase()).refine((val) => CATEGORIES.includes(val), {
    message: 'Invalid category',
});
const paymentMethodValidation = z.string().trim().transform((val) => val.toLowerCase()).refine((val) => PAYMENT_METHODS.includes(val), {
    message: 'Invalid payment method',
});
const amountValidation = z.number().positive('Amount must be greater than 0');


const transactionDateValidation = z.string().refine((dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const now = new Date();
  const fyStartYear = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  const fyStart = new Date(fyStartYear, 3, 1);   
  const fyEnd = new Date(fyStartYear + 1, 2, 31);
  return date >= fyStart && date <= fyEnd;
}, {
  message: 'Transaction date must be within the current financial year'
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