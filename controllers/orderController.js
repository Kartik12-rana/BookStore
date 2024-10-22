const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemsModel');
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemsModel');

// Place an order from the cart
exports.placeOrder = async (req, res) => {
  const userId = req.user;
  console.log(userId)

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
    console.log(err)
    return res.status(500).json({
      status: 500,
      data: {},
      error: "Something Went Wrong",
      err,
    });
  }
};

// Get order history for the authenticated user
exports.getOrderHistory = async (req, res) => {
  
  try {
    const userId = req.user;
    const orders = await Order.findAll({ where: { userId }, include: [OrderItem] });
    if (orders.length === 0) {
      return res.status(400).json({
        status: 400,
        data: {},
        error: "orders history not found",
      });
    }
    else {
      return res.status(200).json({
        status: 200,
        data: orders,
        message: "Order History  list found Suucessfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: {},
      error: "Something Went Wrong",
      err,
    });
  }
};

// Get order details by ID
exports.getOrderDetails = async (req, res) => {
  
  try {
    const  id = req.params.id;
    const order = await Order.findByPk(id, { include: [OrderItem] });
    if (!order) {
      return res.status(400).json({
        status: 400,
        data: {},
        error: "Order not found",
      });
    }
    else {
      return res.status(200).json({
        status: 200,
        data: order,
        message: "Order found Suucessfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: {},
      error: "Something Went Wrong",
      err,
    });
  }
};
