const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");
const bookController = require("../controllers/bookController");
const loanController = require("../controllers/loanController");

// middleware
const loanVerification = require("../../infrastructure/middleware/loanVerification");
const returnVerification = require("../../infrastructure/middleware/returnVerification");
const memberVerification = require("../../infrastructure/middleware/memberVerification");
/**
 * @swagger
 * components:
 *   schemas:
 *     Members:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: string
 *           description: Id of the member unique
 *           example: M001
 *         name:
 *           type: string
 *           description: Name of the member who registers
 *           example: Firly
 *         status_member:
 *           type: string
 *           enum: [Active, Penalized]
 *           description: Status of the member whether active or penalized
 *           example: Active
 *           default: Active
 *         penalize_date:
 *           type: string
 *           format: date-time
 *           description: The penalty date if the member gets penalized
 *           enum: [null, 2023-09-22T02:39:19.261Z]
 *           example: null
 *           default: null
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date when the member registered
 *           example: 2023-09-22T02:39:19.261Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Date when the member was updated
 *           example: 2023-09-22T02:39:19.261Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         code:
 *           type: string
 *           description: Code of the book
 *           example: JK-45
 *         title:
 *           type: string
 *           description: Title of the book
 *           example: Harry Potter
 *         author:
 *           type: string
 *           description: Author of the book
 *           example: J.K. Rowling
 *         stock:
 *           type: integer
 *           description: Stock of the book
 *           example: 1
 *         status_book:
 *           type: string
 *           enum: [Available, Not Available]
 *           description: Status of the book whether available or not available
 *           default: Available
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date when the book was registered
 *           example: 2023-09-22T02:39:19.261Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Date when the book was updated
 *           example: 2023-09-22T02:39:19.261Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       required:
 *         - code
 *         - memberCode
 *         - bookCode
 *       properties:
 *         code:
 *           type: string
 *           description: Unique code of the loan
 *           example: L001
 *         memberCode:
 *           type: string
 *           description: Code of the member who borrowed the book
 *           example: M001
 *         bookCode:
 *           type: string
 *           description: Code of the book being borrowed
 *           example: JK-45
 *         loan_date:
 *           type: string
 *           format: date-time
 *           description: Date when the book was borrowed
 *           example: 2023-09-22T02:39:19.261Z
 *           default: '2023-09-22T02:39:19.261Z'
 *         return_date:
 *           type: string
 *           format: date-time
 *           description: Date when the book was returned
 *           example: null
 *           default: null
 *         status_loan:
 *           type: string
 *           enum: ["Returned", "Not Returned"]
 *           description: Status of the loan, whether the book has been returned or not
 *           example: Not Returned
 *           default: "Not Returned"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date when the loan record was created
 *           example: 2023-09-22T02:39:19.261Z
 *           default: '2023-09-22T02:39:19.261Z'
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Date when the loan record was last updated
 *           example: 2023-09-22T02:39:19.261Z
 *           default: '2023-09-22T02:39:19.261Z'
 */

const bookRouter = () => {
  /**
   * @swagger
   * tags:
   *   - name: Books
   *     description: Operations related to books
   *
   * paths:
   *   /books:
   *     post:
   *       tags:
   *         - Books
   *       summary: Add a new book
   *       description: Add a new book to the library
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       responses:
   *         200:
   *           description: A new book added successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Book'
   *         400:
   *           description: Bad request
   *
   *     get:
   *       tags:
   *         - Books
   *       summary: Check all books (Check Book)
   *       description: |
   *                    Retrieve a list of all books in the library.
   *
   *                    **Note:** The system will show list of books that are available
   *
   *                    **Note:** The system will show the number of books that are available
   *
   *                    **Note:** Books that are being borrowed are not counted
   *       responses:
   *         200:
   *           description: A list of books
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Book'
   *         500:
   *           description: Internal server error
   *
   *   /books/{code}:
   *     get:
   *       tags:
   *         - Books
   *       summary: Get a book by code
   *       description: Retrieve a book's details by its unique code
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the book
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: Book details
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Book'
   *         404:
   *           description: Book not found
   *
   *     put:
   *       tags:
   *         - Books
   *       summary: Update a book
   *       description: Update the details of an existing book
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the book to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       responses:
   *         200:
   *           description: Book updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Book'
   *         400:
   *           description: Bad request
   *         404:
   *           description: Book not found
   *
   *     delete:
   *       tags:
   *         - Books
   *       summary: Delete a book
   *       description: Remove a book from the library
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the book to delete
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: Book deleted successfully
   *         404:
   *           description: Book not found
   */

  router.post("/books", bookController.addBook);
  router.get("/books", bookController.findAll);
  router.get("/books/:code", bookController.findByCode);
  router.put("/books/:code", bookController.updateBook);
  router.delete("/books/:code", bookController.removeBook);

  return router;
};

const memberRouter = () => {
  /**
   * @swagger
   * tags:
   *   - name: Members
   *     description: Operations related to members
   *
   * paths:
   *   /api/members:
   *     post:
   *       tags:
   *         - Members
   *       summary: Add a new member
   *       description: Add a new member to the library system
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Members'
   *       responses:
   *         201:
   *           description: Member added successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Members'
   *         400:
   *           description: Bad request
   *
   *     get:
   *       tags:
   *         - Members
   *       summary: Get all members (Check Member)
   *       description: |
   *                    Retrieve a list of all members.
   *
   *                    **Note:** The system will show all the existing members
   *
   *                    **Note:** The system will show the number of books borrowed by each member
   *       responses:
   *         200:
   *           description: A list of members
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Members'
   *         500:
   *           description: Internal server error
   *
   *   /api/members/{code}:
   *     get:
   *       tags:
   *         - Members
   *       summary: Get a member by code
   *       description: Retrieve details of a member using their Loan Code
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The unique code of the member
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: Member details
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Members'
   *         404:
   *           description: Member not found
   *
   *     put:
   *       tags:
   *         - Members
   *       summary: Update a member
   *       description: Update the details of an existing member
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The unique code of the member to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Members'
   *       responses:
   *         200:
   *           description: Member updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Members'
   *         400:
   *           description: Bad request
   *         404:
   *           description: Member not found
   *
   *     delete:
   *       tags:
   *         - Members
   *       summary: Delete a member
   *       description: Remove a member from the library system
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The unique code of the member to delete
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: Member deleted successfully
   *         404:
   *           description: Member not found
   */

  router.post("/members", memberController.addMember);
  router.get("/members", memberController.findAll);
  router.get("/members/:code", memberVerification, memberController.findByCode);
  router.put("/members/:code", memberController.updateMember);
  router.delete("/members/:code", memberController.removeMember);

  return router;
};

const loanRouter = () => {
  /**
   * @swagger
   * tags:
   *   - name: Loans
   *     description: Operations related to loan transactions
   *
   * paths:
   *   /api/loans:
   *     post:
   *       tags:
   *         - Loans
   *       summary: Loan a book
   *       description: |
   *                    Member Borrowing Books in circumstances:
   *
   *                    **Note:** The system will check if the member has reached the maximum number of books borrowed which is 2
   *
   *                    **Note:** The system will check if the book is available and not borrowed by another member
   *
   *                    **Note:** The system will check if the member is borrowing the same book
   *
   *                    **Note:** The system will check if the book is out of stock
   *
   *                    **Note:** The system will check if member is currently penalized
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Loan'
   *       responses:
   *         200:
   *           description: Loan added successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Loan'
   *         400:
   *           description: Bad request
   *     get:
   *       tags:
   *         - Loans
   *       summary: Get all loans
   *       description: Retrieve a list of all loan records
   *       responses:
   *         200:
   *           description: A list of loans
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Loan'
   *         500:
   *           description: Internal server error
   *
   *   /api/loans/{code}:
   *     get:
   *       tags:
   *         - Loans
   *       summary: Get a loan by code
   *       description: Retrieve a loan record by its unique code
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the loan
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: Loan details
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Loan'
   *         404:
   *           description: Loan not found
   *     put:
   *       tags:
   *         - Loans
   *       summary: Return a book
   *       description: |
   *                    Return book to the library in circumstances:
   *
   *                    **Note:** return book has to be the same book that was borrowed
   *
   *                    **Note:** if the book is returned, the book stock will increase by 1
   *
   *                    **Note:** if the book is returned more than 7 days, the member will be penalized for 3 days and can't borrow books
   *
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the loan to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Loan'
   *       responses:
   *         200:
   *           description: Loan updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Loan'
   *         400:
   *           description: Bad request
   *         404:
   *           description: Loan not found
   *     delete:
   *       tags:
   *         - Loans
   *       summary: Delete a loan
   *       description: Remove a loan record from the library
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the loan to delete
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: Loan deleted successfully
   *         404:
   *           description: Loan not found
   *
   *   /api/loans/memberCode/{code}:
   *     get:
   *       tags:
   *         - Loans
   *       summary: Get all loans by member code
   *       description: Retrieve all loan records for a specific member
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the member
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: A list of loans for the member
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Loan'
   *         404:
   *           description: Member or loans not found
   *
   *   /api/loans/bookCode/{code}:
   *     get:
   *       tags:
   *         - Loans
   *       summary: Get all loans by book code
   *       description: Retrieve all loan records for a specific book
   *       parameters:
   *         - name: code
   *           in: path
   *           required: true
   *           description: The code of the book
   *           schema:
   *             type: string
   *       responses:
   *         200:
   *           description: A list of loans for the book
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Loan'
   *         404:
   *           description: Book or loans not found
   */

  router.post("/loans", loanVerification, loanController.addLoan);
  router.get("/loans", loanController.findAll);
  router.get("/loans/:code", loanController.findByCode);
  router.get("/loans/memberCode/:code", loanController.findLoanByMemberCode);
  router.get("/loans/bookCode/:code", loanController.findLoanByBookCode);
  router.put("/loans/:code", returnVerification, loanController.updateLoan);
  router.delete("/loans/:code", loanController.removeLoan);

  return router;
};

module.exports = { bookRouter, memberRouter, loanRouter };
