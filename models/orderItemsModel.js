const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Order = require('./orderModel');
const Book = require('./bookModel');

const OrderItem = sequelize.define('OrderItem', {
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

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = OrderItem;
