const BookRepository = require("./bookRepository");

class BookService {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  async addBook(bookInfo) {
    return this.bookRepository.addBook(bookInfo);
  }

  async findByCode(code) {
    return this.bookRepository.findByCode(code);
  }

  async findAll() {
    return this.bookRepository.findAll();
  }

  async updateBook(code, bookInfo) {
    return this.bookRepository.updateBook(code, bookInfo);
  }

  async removeBook(code) {
    return this.bookRepository.removeBook(code);
  }
}

module.exports = BookService;
