const express = require('express');
const { getCartDetails, addBookToCart, removeBookFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/cart - Get cart details for the authenticated user
router.get('/getCart', authMiddleware, getCartDetails);

// POST /api/cart - Add a book to the cart
router.post('/addBookToCart', authMiddleware, addBookToCart);

// DELETE /api/cart/:itemId - Remove a book from the cart
router.delete('/removeCart/:itemId', authMiddleware, removeBookFromCart);

module.exports = router;
