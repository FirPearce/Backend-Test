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
    return Book.find();
  }

  async updateBook(bookCode, bookInfo) {
    return Book.updateOne({ code: bookCode }, bookInfo);
  }

  async removeBook(bookCode) {
    return Book.deleteOne({ code: bookCode });
  }
}

module.exports = BookRepository;
