const Book = require("./book");

class BookRepository {
  async addBook(bookInfo) {
    const newBook = Book(bookInfo);
    await newBook.save();
    return newBook;
  }

  async findByCode(code) {
    return Book.findOne({ code });
  }

  async findAll() {
    return Book.find();
  }

  async updateBook(code, bookInfo) {
    return Book.updateOne({ code }, bookInfo);
  }

  async removeBook(code) {
    return Book.deleteOne({ code });
  }
}

module.exports = BookRepository;
