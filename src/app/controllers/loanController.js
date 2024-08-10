const LoanService = require("../../domain/loan/loanService");

const addLoan = async (req, res) => {
  try {
    const loanService = new LoanService();
    const loanInfo = req.body;
    const loan = await loanService.addLoan(loanInfo);
    res.status(201).json({ message: "Loan added successfully", result: loan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const loanService = new LoanService();
    const loans = await loanService.findAll();
    res.status(200).json({ result: loans });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findByCode = async (req, res) => {
  try {
    const loanService = new LoanService();
    const code = req.params.code;
    const loan = await loanService.findByCode(code);
    res.status(200).json({ result: loan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findLoanByMemberCode = async (req, res) => {
  try {
    const loanService = new LoanService();
    const memberCode = req.params.memberCode;
    const loans = await loanService.findLoanByMemberCode(memberCode);
    res.status(200).json({ result: loans });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateLoan = async (req, res) => {
  try {
    const loanService = new LoanService();
    const loanInfo = req.body;
    const code = loanInfo.code;
    const loan = await loanService.updateLoan(code, loanInfo);
    res
      .status(200)
      .json({ message: "Loan updated successfully", result: loan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeLoan = async (req, res) => {
  try {
    const loanService = new LoanService();
    const code = req.body;
    await loanService.removeLoan(code);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addLoan,
  findAll,
  findByCode,
  updateLoan,
  removeLoan,
  findLoanByMemberCode,
};
