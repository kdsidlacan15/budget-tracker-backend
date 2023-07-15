const router = require("express").Router();
const Income = require("./../models/Income");
const { verifyUser } = require("./../utils");
const { verifyAdmin } = require("./../utils");

//Add Income
router.post("/", verifyUser, (req, res, next) => {
  // let description = req.body.entry.map(entry => entry.description)
  // console.log(description)
  // let value = req.body.entry.map(entry => entry.value)
  // console.log(value)

  // let newDescription = Object.assign({}, description)
  // console.log(newDescription)
  // let newValue= Object.assign({}, value)
  // console.log(newValue)

  Income.create({
    category: req.body.category,
    user: req.user.id,
    entry: req.body.entry,
    value: req.body.value,
  })
    .then((income) => {
      res.send(income);
    })
    .catch(next);
});

module.exports = router;

//Get All User Income
router.get("/", verifyUser, (req, res, next) => {
  const { _id } = req.user;
  Income.find({ user: _id })
    .then((income) => {
      res.send(income);
    })
    .catch(next);
});

//Update Income Entry/Category
router.put("/:id", verifyUser, (req, res, next) => {
  Income.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    omitUndefined: true,
  })
    .then((income) => {
      res.send(income);
    })
    .catch(next);
});

//Delete Income Entry/Category

router.delete("/:id", verifyUser, (req, res, next) => {
  Income.findByIdAndDelete(req.params.id)
    .then((income) => {
      res.send(income);
    })
    .catch(next);
});

//Admin View income of Specific User
router.get("/:id", verifyUser, verifyAdmin, (req, res, next) => {
  Income.find({ user: req.params.id })
    .then((income) => {
      res.send(income);
    })
    .catch(next);
});
