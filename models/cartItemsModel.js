const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Cart = require('./cartModel');
const Book = require('./bookModel');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: false
});

CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = CartItem;
