const db = require('../models');
const Expense = db.Expense;

exports.createExpense = async (req, res, next) => {
  try {
    const { description, amount, category } = req.body;
    const expense = await Expense.create({
      description,
      amount,
      category,
      userId: req.user.id
    });
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({
      where: { id, userId: req.user.id }
    });
    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    await expense.destroy();
    res.json({ message: 'Gasto eliminado' });
  } catch (error) {
    next(error);
  }
};
