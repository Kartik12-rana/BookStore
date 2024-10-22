const express = require('express');
const {createBooks, listBooks, getBookDetails } = require('../controllers/bookController');
const router = express.Router();

router.post('/addBook',createBooks )
router.get('/', listBooks);
router.get('/:id', getBookDetails);

module.exports = router;
