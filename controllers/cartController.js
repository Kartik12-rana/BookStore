const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemsModel');
const Book = require('../models/bookModel');

// Get cart details for the authenticated user
exports.getCartDetails = async (req, res) => {
  
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ where: { userId }});
    if (!cart) {
      return res.status(400).json({
        status: 400,
        data: {},
        error: "Cart not found",
      });
    }
    else {
      return res.status(200).json({
        status: 200,
        data: cart,
        message: "Cart fetched Suucessfully",
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

// Add a book to the cart
exports.addBookToCart = async (req, res) => {
  
  try {
    const userId = req.user;
  
    const data = {
      bookId : req.body.bookId,
      quantity : req.body.quantity
    }
    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, bookId : data.bookId} });
    if (cartItem) {
      cartItem.quantity += data.quantity;
    } else {
      data.cartId = cart.id
      console.log(data)
      cartItem = await CartItem.create(data);
    }

    await cartItem.save();
    return res.status(200).json({
      status: 200,
      data: cartItem,
      message: "book added Suucessfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: {},
      error: "Something Went Wrong",
      err,
    });
  }
};

// Remove a book from the cart
exports.removeBookFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cartItem = await CartItem.findByPk(itemId);
    if (!cartItem){  
      return res.status(400).json({
        status: 400,
        data: {},
        error: "Item not found",
      });
    }

    await cartItem.destroy();
    return res.status(200).json({
      status: 200,
      data: {},
      message: "Item removed from cart",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: {},
      error: "Something Went Wrong",
      err,
    });
  }
};
