const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemsModel');
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemsModel');

// Place an order from the cart
exports.placeOrder = async (req, res) => {
  const userId = req.user;

  try {
    const cart = await Cart.findOne({ where: { userId }, include: [CartItem] });
    if (!cart || cart.CartItems.length === 0) return res.status(400).json({ msg: 'Cart is empty' });

    const totalPrice = cart.CartItems.reduce((sum, item) => sum + item.quantity * item.book.price, 0);
    const order = await Order.create({ userId, totalPrice });

    for (const item of cart.CartItems) {
      await OrderItem.create({ orderId: order.id, bookId: item.bookId, quantity: item.quantity });
      await item.destroy();  // Remove item from cart
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get order history for the authenticated user
exports.getOrderHistory = async (req, res) => {
  const userId = req.user;

  try {
    const orders = await Order.findAll({ where: { userId }, include: [OrderItem] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get order details by ID
exports.getOrderDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, { include: [OrderItem] });
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
