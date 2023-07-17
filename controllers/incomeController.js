const Income = require("../models/Income");

// Get All Income
const getAllIncome = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const allIncome = await Income.find({ user: _id });
    res.send(allIncome);
  } catch (error) {
    next(error);
  }
};

// Create Income
const addIncome = async (req, res, next) => {
  const { _id } = req.user;
  const { category, entry, value } = req.body;
  try {
    const income = await Income.create({
      category,
      user: _id,
      entry,
      value,
    });
    res.send(income);
  } catch (error) {
    next(error);
  }
};
// Update Income
const updateIncome = async (req, res, next) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        omitUndefined: true,
      }
    );
    res.send(updatedIncome);
  } catch (error) {
    next(error);
  }
};

// Delete Income
const deleteIncome = async (req, res, next) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    res.send(deletedIncome);
  } catch (error) {
    next(error);
  }
};

// Admin View All Income of specific User
const viewIncome = async (req, res, next) => {
  try {
    const userIncome = await Income.find({ user: req.params.id });
    res.send(userIncome);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllIncome,
  addIncome,
  updateIncome,
  deleteIncome,
  viewIncome,
};
