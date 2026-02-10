const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, expenseController.createExpense);
router.get('/', verifyToken, expenseController.getExpenses);
router.delete('/:id', verifyToken, expenseController.deleteExpense);

module.exports = router;
