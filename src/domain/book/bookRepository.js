const Book = require("./book");

class BookRepository {
  async addBook(bookInfo) {
    const newBook = Book(bookInfo);
    await newBook.save();
    return newBook;
  }

  async findByCode(bookCode) {
    return Book.findOne({ code: bookCode });
  }

  async findAll() {
    // find all books stock greater than 0
    return Book.find({ stock: { $gt: 0 } });
  }

  async updateBook(bookCode, bookInfo) {
    return Book.updateOne({ code: bookCode }, bookInfo);
  }

  async removeBook(bookCode) {
    return Book.deleteOne({ code: bookCode });
  }
}

module.exports = BookRepository;
