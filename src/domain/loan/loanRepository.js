const Loan = require("./loan");

class LoanRepository {
  async addLoan(loanInfo) {
    const newLoan = Loan(loanInfo);
    await newLoan.save();
    return newLoan;
  }

  async findAll() {
    return Loan.find();
  }

  async findByCode(code) {
    return Loan.findOne({ code });
  }

  async findLoanByMemberCode(memberCode) {
    return Loan.find({ memberCode });
  }

  async findLoanByBookCode(bookCode) {
    return Loan.find({ bookCode });
  }

  async updateLoan(loanCode, loanInfo) {
    return Loan.updateOne({ code: loanCode }, loanInfo);
  }

  async removeLoan(loanCode) {
    return Loan.deleteOne({ code: loanCode });
  }
}

module.exports = LoanRepository;
