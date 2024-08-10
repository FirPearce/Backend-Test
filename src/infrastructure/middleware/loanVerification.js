const BookService = require("../../domain/book/bookService");
const LoanService = require("../../domain/loan/loanService");
const MemberService = require("../../domain/member/memberService");

const verifyLoan = async (req, res, next) => {
  const { memberCode, bookCode } = req.body;
  const bookService = new BookService();
  const loanService = new LoanService();
  const memberService = new MemberService();

  try {
    // check jika member status is Penalized
    const member = await memberService.findByCode(memberCode);
    const isPenalized = member.status_member === "Penalized";
    if (isPenalized) {
      return res.status(400).json({
        message: "Member is penalized, Member cant borrow book until!",
        penalize_date: member.penalize_date,
      });
    }

    // check if member dan book body is empty
    if (!bookCode || !memberCode) {
      return res
        .status(400)
        .json({ message: "Book code and member code are required" });
    }

    // check if book stock is > 0 && book is not borrowed by another member
    const book = await bookService.findByCode(bookCode);
    const loanBook = await loanService.findLoanByBookCode(bookCode);
    const borrowedBookMember = loanBook.filter(
      (loan) => loan.status_loan === "Not Returned"
    );
    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }
    if (book.stock <= 0) {
      if (
        borrowedBookMember.length > 0 &&
        borrowedBookMember[0].memberCode !== memberCode
      ) {
        return res.status(400).json({
          message: "Book is borrowed by another member",
          status_loan: [borrowedBookMember.map((loan) => loan.status_loan)],
        });
      } else {
        return res.status(400).json({ message: "Book is out of stock" });
      }
    }

    // count the number of books borrowed by the member by status Not Returned
    const loanMember = await loanService.findLoanByMemberCode(memberCode);
    const countLoan = loanMember.filter(
      (loan) => loan.status_loan === "Not Returned"
    ).length;
    if (countLoan >= 2) {
      return res.status(400).json({
        message: "Member has reached the maximum number of books borrowed",
      });
    }

    // check if member is borrowing the same book
    const isBorrowing = loanMember.find(
      (loan) =>
        loan.bookCode === bookCode && loan.status_loan === "Not Returned"
    );
    if (isBorrowing) {
      return res.status(400).json({
        message: "Member is borrowing the same book",
        bookCode: isBorrowing.bookCode,
        status_loan: isBorrowing.status_loan,
      });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = verifyLoan;
