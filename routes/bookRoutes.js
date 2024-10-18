const express = require('express');
const { listBooks, getBookDetails } = require('../controllers/bookController');
const router = express.Router();

router.get('/', listBooks);
router.get('/:id', getBookDetails);

module.exports = router;
