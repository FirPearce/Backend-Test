const LoanService = require("../../domain/loan/loanService");

const returnLoan = async (req, res, next) => {
  const { memberCode, bookCode, code } = req.body;
  const loanService = new LoanService();

  try {
    // check if member dan book body is empty
    if (!bookCode || !memberCode) {
      return res
        .status(400)
        .json({ message: "Book code and member code are required!" });
    }

    // check if book is borrowed by member
    const loanBook = await loanService.findByCode(code);

    if (loanBook.memberCode !== memberCode) {
      return res.status(400).json({
        message: "Book is not borrowed by the member",
      });
    }

    // // check if book is returned
    if (loanBook.status_loan === "Returned") {
      return res.status(400).json({ message: "Book is already returned" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = returnLoan;
