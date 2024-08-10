const BookService = require("../../domain/book/bookService");

const addBook = async (req, res) => {
  try {
    const bookService = new BookService();
    const bookInfo = req.body;
    const book = await bookService.addBook(bookInfo);
    res.status(201).json({ message: "Book added successfully", result: book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const bookService = new BookService();
    const books = await bookService.findAll();
    res.status(200).json({ result: books });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findByCode = async (req, res) => {
  try {
    const bookService = new BookService();
    const code = req.params.code;
    const book = await bookService.findByCode(code);
    res.status(200).json({ result: book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookService = new BookService();
    const code = req.params.code;
    const bookInfo = req.body;
    const book = await bookService.updateBook(code, bookInfo);
    res
      .status(200)
      .json({ message: "Book updated successfully", result: book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeBook = async (req, res) => {
  try {
    const bookService = new BookService();
    const code = req.params.code;
    await bookService.removeBook(code);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addBook,
  findAll,
  findByCode,
  updateBook,
  removeBook,
};
