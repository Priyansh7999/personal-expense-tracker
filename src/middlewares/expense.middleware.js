const { createExpenseSchema } = require('../validations/expense.validation');

const CreateExpenseMiddleware = (req, res, next) => {
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

module.exports = { CreateExpenseMiddleware };