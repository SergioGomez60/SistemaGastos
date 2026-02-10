const express = require('express');
const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes');

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

module.exports = router;
