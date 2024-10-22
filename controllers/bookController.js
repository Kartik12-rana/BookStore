const Book = require("../models/bookModel");

exports.createBooks = async (req, res) => {
  try {
    //Get the registration data both admin and customer
    const bookData = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
    };

    //Find the user in the database
    const findBook = await Book.findOne({
      where: { title: bookData.title },
    });

    // If same user exist so can not the forward
    if (findBook) {
      return res.status(400).json({
        status: 400,
        data: {},
        error: "Book Already Exist!!!",
      });
    }

    // Get the user details from the database
    const createBook = await Book.create(bookData);

    return res.status(200).json({
      status: 200,
      data: createBook,
      message: "Books Created Suucessfullt",
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
// List all books
exports.listBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      return res.status(400).json({
        status: 400,
        data: {},
        error: "Book not found",
      });
    }
    else {
      return res.status(200).json({
        status: 200,
        data: books,
        message: "Books list found Suucessfully",
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

// Get book details by ID
exports.getBookDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(400).json({
        status: 400,
        data: {},
        error: "Book not found",
      });
    }
    else {
      return res.status(200).json({
        status: 200,
        data: book,
        message: "Books fetched Suucessfully",
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
