const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;
const User = require("./models/User");

module.exports.verifyUser = (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(403);
    throw { message: "Unauthorize" };
  }

  //   let token = authorization.slice(7, authorization.length);
  const token = authorization.split(" ")[1];

  let decoded = jwt.verify(token, privateKey);

  User.findById(decoded.userId)
    .select({ password: 0 })
    .then((user) => {
      if (!user) {
        res.status(403);
        next(new Error("Unauthorize"));
      } else {
        req.user = user;
        next();
      }
    })
    .catch(next);
};

module.exports.verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw { message: "Unauthorize" };
  } else {
    next();
  }
};
