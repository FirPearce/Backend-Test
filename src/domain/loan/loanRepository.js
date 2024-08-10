const Loan = require("./loan");

class LoanRepository {
  async addLoan(loanInfo) {
    const newLoan = Loan(loanInfo);
    await newLoan.save();
    return await newLoan;
  }

  async findAll() {
    return await Loan.find();
  }

  async findByCode(loanCode) {
    return await Loan.findOne({ code: loanCode });
  }

  async findLoanByMemberCode(codeMember) {
    return await Loan.find({ memberCode: codeMember });
  }

  async findLoanByBookCode(codeBook) {
    return await Loan.find({ bookCode: codeBook });
  }

  async updateLoan(loanCode, loanInfo) {
    return await Loan.updateOne({ code: loanCode }, loanInfo);
  }

  async removeLoan(loanCode) {
    return await Loan.deleteOne({ code: loanCode });
  }
}

module.exports = LoanRepository;
