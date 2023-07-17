const User = require("../../models/User");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;

const registerUser = async (req, res, next) => {
  try {
    // validate password
    let { password, confirmPassword } = req.body;

    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      throw Error("Email already in use");
    }

    if (password.length < 8) {
      throw new Error("Password must be atleast 8 characters");
    }
    if (password !== confirmPassword) {
      throw new Error("Password did not match");
    }
    // hash password
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create(req.body);
    user.password = hashedPass;
    res.send(user);
    bcrypt
      .hash(req.body.password, saltRounds)
      .then((hash) => {
        req.body.password = hash;

        return User.create(req.body);
      })
      .then((user) => {
        user.password = undefined;
        res.send(user);
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      req.user = user;
    } else {
      res.status(401);
      throw new Error("Invalid Email Address");
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (isMatchPassword) {
      const token = jwt.sign({ userId: req.user._id }, privateKey);
      res.send({ token });
    } else {
      res.status(401);
      throw new Error("Password did not match");
    }
  } catch (error) {
    next(error);
  }
};

// Admin get all users
const getAllusers = async (req, res, next) => {
  try {
    const users = await User.find({ isActive: true });
    res.send(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getAllusers };
