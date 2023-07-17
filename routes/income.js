const router = require("express").Router();
const { verifyUser } = require("./../utils");
const { verifyAdmin } = require("./../utils");
const {
  getAllIncome,
  addIncome,
  updateIncome,
  deleteIncome,
  viewIncome,
} = require("../controllers/incomeController");

//Add Income
router.post("/", verifyUser, addIncome);

//Get All User Income
router.get("/", verifyUser, getAllIncome);

//Update Income Entry/Category
router.put("/:id", verifyUser, updateIncome);

//Delete Income Entry/Category
router.delete("/:id", verifyUser, deleteIncome);

//Admin View income of Specific User
router.get("/:id", verifyUser, verifyAdmin, viewIncome);

module.exports = router;
