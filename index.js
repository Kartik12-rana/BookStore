const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()

const sequelize = require('./config/dbConfig');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/auth',authRoutes);
app.use('/book',bookRoutes);
app.use('/cart',cartRoutes)
app.use('/order',orderRoutes)

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database connected and synced');
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch((err) => console.log('Error connecting to the database', err));
