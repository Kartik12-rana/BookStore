const express = require('express');
const { placeOrder, getOrderHistory, getOrderDetails } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/orders - Place an order from the cart
router.post('/', authMiddleware, placeOrder);

// GET /api/orders - View order history for the authenticated user
router.get('/', authMiddleware, getOrderHistory);

// GET /api/orders/:id - Get order details by ID
router.get('/:id', authMiddleware, getOrderDetails);

module.exports = router;
