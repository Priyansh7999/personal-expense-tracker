// src/middlewares/expense.middleware.js
const { createExpenseSchema, updateExpenseSchema } = require('../validations/expense.validation');

const createExpenseMiddleware = (req, res, next) => {
  const result = createExpenseSchema.safeParse(req.body);
  if (!result.success) {
    const error = result.error.issues[0];
    return res.status(400).json({
      error: {
        code: 'INVALID_EXPENSE_DATA',
        message: error.message,
        field: error.path[0],
      },
    });
  }
  req.body = result.data;
  next();
};

const updateExpenseMiddleware = (req, res, next) => {
  const restrictedFields = ['id', 'createdAt', 'user_id'];
  for (const field of restrictedFields) {
    if (req.body[field] !== undefined) {
      return res.status(400).json({
        error: {
          code: 'INVALID_UPDATE_FIELDS',
          message: 'id, createdAt, and user_id cannot be updated',
        },
      });
    }
  }

  const result = updateExpenseSchema.safeParse(req.body);

  if (!result.success) {
    const error = result.error.issues[0];
    return res.status(400).json({
      error: {
        code: 'INVALID_EXPENSE_DATA',
        message: error.message,
        field: error.path[0],
      },
    });
  }

  req.body = result.data;
  next();
};
module.exports = { createExpenseMiddleware,updateExpenseMiddleware };