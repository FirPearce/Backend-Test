const LoanRepository = require("./loanRepository");
const BookService = require("../book/bookService");
const MemberService = require("../member/memberService");

class LoanService {
  constructor() {
    this.loanRepository = new LoanRepository();
    this.bookService = new BookService();
    this.memberService = new MemberService();
  }

  async addLoan(loanInfo) {
    const { bookCode } = loanInfo;
    const book = await this.bookService.findByCode(bookCode);
    if (!book) {
      return new Error("Book not found");
    }
    if (book.stock > 0) {
      // update stock book
      const stockBook = book.stock - 1;
      let statusBook;
      if (stockBook <= 0) {
        statusBook = "Not Available";
      } else {
        statusBook = "Available";
      }
      await this.bookService.updateBook(bookCode, {
        stock: stockBook,
        status_book: statusBook,
      });

      return this.loanRepository.addLoan(loanInfo);
    }
  }

  async findAll() {
    return this.loanRepository.findAll();
  }

  async findByCode(loanCode) {
    return this.loanRepository.findByCode(loanCode);
  }

  async findLoanByMemberCode(codeMember) {
    return this.loanRepository.findLoanByMemberCode(codeMember);
  }

  findLoanByBookCode(codeBook) {
    return this.loanRepository.findLoanByBookCode(codeBook);
  }

  async updateLoan(loanCode, loanInfo) {
    // check if bookCode is updated
    const { memberCode, bookCode } = loanInfo;
    const member = await this.memberService.findByCode(memberCode);
    const book = await this.bookService.findByCode(bookCode);
    const loan = await this.loanRepository.findByCode(loanCode);
    let statusBook;

    if (!member || !book) {
      return new Error("Member or book not found");
    }
    // check jika return_date is updated dan status_loan is "Returned"
    if (loanInfo.return_date && loan.status_loan === "Not Returned") {
      // update stock book
      const stockBook = book.stock + 1;
      if (stockBook > 0) {
        statusBook = "Available";
      } else {
        statusBook = "Not Available";
      }
      await this.bookService.updateBook(bookCode, {
        stock: stockBook,
        status_book: statusBook,
      });
    }

    // jika return_date > 7 hari dari loan_date, maka member status is "Penalized"
    const loanDate = new Date(loan.loan_date);
    const returnDate = new Date(loanInfo.return_date);
    const diffTime = Math.abs(returnDate - loanDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      await this.memberService.updateMember(memberCode, {
        status_member: "Penalized",
        // add penalize_date 3 hari dari return_date
        penalize_date: new Date(loanInfo.return_date).setDate(
          new Date(loanInfo.return_date).getDate() + 3
        ),
      });
      //   add message to loanInfo
      Object.assign(loanInfo, {
        message: "Member is penalized, Member cant borrow book until",
        penalize_date: member.penalize_date,
      });
    }
    return this.loanRepository.updateLoan(loanCode, loanInfo);
  }

  async removeLoan(loanCode) {
    return this.loanRepository.removeLoan(loanCode);
  }
}

module.exports = LoanService;
