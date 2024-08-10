const BookRepository = require("./bookRepository");

class BookService {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  async addBook(bookInfo) {
    return this.bookRepository.addBook(bookInfo);
  }

  async findByCode(bookCode) {
    return this.bookRepository.findByCode(bookCode);
  }

  async findAll() {
    return this.bookRepository.findAll();
  }

  async updateBook(bookCode, bookInfo) {
    return this.bookRepository.updateBook(bookCode, bookInfo);
  }

  async removeBook(bookCode) {
    return this.bookRepository.removeBook(bookCode);
  }
}

module.exports = BookService;
