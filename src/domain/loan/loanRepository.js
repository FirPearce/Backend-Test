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

  async findByCode(loanCode) {
    return Loan.findOne({ code: loanCode });
  }

  async findLoanByMemberCode(codeMember) {
    return Loan.find({ memberCode: codeMember });
  }

  async findLoanByBookCode(codeBook) {
    return Loan.find({ bookCode: codeBook });
  }

  async updateLoan(loanCode, loanInfo) {
    return Loan.updateOne({ code: loanCode }, loanInfo);
  }

  async removeLoan(loanCode) {
    return Loan.deleteOne({ code: loanCode });
  }
}

module.exports = LoanRepository;
