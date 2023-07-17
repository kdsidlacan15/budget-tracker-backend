const Expense = require("../models/Expense");

// Get All Expenses
const getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.send(expenses);
  } catch (error) {
    next(error);
  }
};
// Create Expense
const addExpense = async (req, res, next) => {
  const { _id } = req.user;
  const { category, entry, value } = req.body;
  try {
    const expense = await Expense.create({
      category,
      user: _id,
      entry,
      value,
    });
    res.send(expense);
  } catch (error) {
    next(error);
  }
};
// Update Expense
const updateExpense = async (req, res, next) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        omitUndefined: true,
      }
    );
    res.send(updatedExpense);
  } catch (error) {
    next(error);
  }
};
// Delete Expense
const deleteExpense = async (req, res, next) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (deletedExpense) {
      res.send(deletedExpense);
    } else {
      res.send({ message: "Expense Id not found" });
    }
  } catch (error) {
    next(error);
  }
};
// Admin View All expenses of specific User
const viewExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.params.id });
    res.send(expenses);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  viewExpense,
};
