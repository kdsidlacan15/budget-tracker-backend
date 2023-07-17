const router = require("express").Router();
const Expense = require("./../models/Expense");
const { verifyUser } = require("./../utils");
const { verifyAdmin } = require("./../utils");
const {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  viewExpense,
} = require("./controllers/expenseController");

//Add Expense
router.post("/", verifyUser, addExpense);

//Get User Expenses
router.get("/", verifyUser, getAllExpenses);

//Update Expenses Entry/Category
router.put("/:id", verifyUser, updateExpense);

//Delete Expenses Entry/Category
router.delete("/:id", verifyUser, deleteExpense);

//Admin View expenses of Specific User
router.get("/:id", verifyUser, verifyAdmin, viewExpense);

module.exports = router;
