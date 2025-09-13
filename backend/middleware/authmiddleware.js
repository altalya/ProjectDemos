const User = require("../models/user.model");

function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const jwt = require("jsonwebtoken");
  const SECRET = "token";
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    let userdetails=await User.findOne({name: { $eq: user.name }});
    console.log("user",userdetails);
    req.user = userdetails;
    next();
  });
}
function authorizationMiddleware(...allowedRoles) {
  return (req, res, next) => {
    console.log("req.user",req.user);
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
}

module.exports = {
  authenticationMiddleware,
  authorizationMiddleware,
};
