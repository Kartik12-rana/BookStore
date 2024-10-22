const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');


const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0
  }
}, {
  timestamps: false
});

Cart.belongsTo(User, { foreignKey: 'userId' });


console.log("cart !!", Cart)
module.exports = Cart;
