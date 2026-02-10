const { z } = require('zod');

const PAYMENT_METHODS = ['cash', 'credit card', 'debit card', 'upi'];
const CATEGORIES = ['emi', 'food', 'transport', 'healthcare', 'rent', 'other'];


const titleValidation = z.string().trim().min(3, 'Title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters');
const descriptionValidation = z.string().trim().min(5, 'Description must be at least 5 characters').max(1000, 'Description cannot exceed 1000 characters');
const categoryValidation = z.string().trim().transform((val) => val.toLowerCase()).refine((val) => CATEGORIES.includes(val), {
    message: 'Invalid category',
});
const paymentMethodValidation = z.string().trim().transform((val) => val.toLowerCase()).refine((val) => PAYMENT_METHODS.includes(val), {
    message: 'Invalid payment method',
});
const amountValidation = z.number({required_error: 'Amount is required',invalid_type_error: 'Amount must be a number',}).positive('Amount must be greater than 0');

