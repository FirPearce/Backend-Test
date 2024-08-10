const LoanService = require("../../domain/loan/loanService");

const returnLoan = async (req, res, next) => {
  const { memberCode, bookCode } = req.body;
  const code = req.params.code;
  const loanService = new LoanService();

  try {
    // check if member dan book body is empty
    if (!bookCode || !memberCode) {
      return res
        .status(400)
        .json({ message: "Book code and member code are required!" });
    }

    const loanBook = await loanService.findByCode(code);

    // jika loan tidak ditemukan
    if (!loanBook) {
      return res.status(400).json({ message: "Loan Code not found" });
    }

    // jika tidak sesuai code loan
    if (loanBook.code !== code) {
      return res.status(400).json({ message: "Loan code is invalid" });
    }

    if (loanBook.memberCode !== memberCode) {
      return res.status(400).json({
        message: "Book is not borrowed by the member",
      });
    }

    // check if book is returned
    if (loanBook.status_loan === "Returned") {
      return res.status(400).json({ message: "Book is already returned" });
    }

    //  check if bookCode is same with BookService code
    if (loanBook.bookCode !== bookCode) {
      return res.status(400).json({ message: "Book code is invalid" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = returnLoan;
