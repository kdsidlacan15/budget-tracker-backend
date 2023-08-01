const router = require('express').Router();
const { verifyUser } = require('./../utils');
const { verifyAdmin } = require('./../utils');
const {
  registerUser,
  loginUser,
  getAllusers,
} = require('../controllers/userController');

// register
router.post('/register', registerUser);

// login
router.post('/login', loginUser);

//Get All users(Admin)
router.get('/', verifyUser, verifyAdmin, getAllusers);

module.exports = router;
