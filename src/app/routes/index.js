const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");
const bookController = require("../controllers/bookController");
const loanController = require("../controllers/loanController");

// middleware
const loanVerification = require("../../infrastructure/middleware/loanVerification");
const returnVerification = require("../../infrastructure/middleware/returnVerification");

const bookRouter = () => {
  router.post("/books", bookController.addBook);
  router.get("/books", bookController.findAll);
  router.get("/books/:code", bookController.findByCode);
  router.put("/books/:code", bookController.updateBook);
  router.delete("/books/:code", bookController.removeBook);

  return router;
};

const memberRouter = () => {
  router.post("/members", memberController.addMember);
  router.get("/members", memberController.findAll);
  router.get("/members/:code", memberController.findByCode);
  router.put("/members/:code", memberController.updateMember);
  router.delete("/members/:code", memberController.removeMember);

  return router;
};

const loanRouter = () => {
  router.post("/loans", loanVerification, loanController.addLoan);
  router.get("/loans", loanController.findAll);
  router.get("/loans/:code", loanController.findByCode);
  router.get("/loans/:memberCode", loanController.findLoanByMemberCode);
  router.put("/loans/:code", returnVerification, loanController.updateLoan);
  router.delete("/loans/:code", loanController.removeLoan);

  return router;
};

module.exports = { bookRouter, memberRouter, loanRouter };
