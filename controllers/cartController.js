const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemsModel');
const Book = require('../models/bookModel');

// Get cart details for the authenticated user
exports.getCartDetails = async (req, res) => {
  const userId = req.user;

  try {
    const cart = await Cart.findOne({ where: { userId }, include: [CartItem] });
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add a book to the cart
exports.addBookToCart = async (req, res) => {
  const userId = req.user;
  const { bookId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, bookId } });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = await CartItem.create({ cartId: cart.id, bookId, quantity });
    }

    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Remove a book from the cart
exports.removeBookFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cartItem = await CartItem.findByPk(itemId);
    if (!cartItem) return res.status(404).json({ msg: 'Item not found' });

    await cartItem.destroy();
    res.json({ msg: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
